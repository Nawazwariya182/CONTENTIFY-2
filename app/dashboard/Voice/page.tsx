'use client'

import React, { useState, useRef, useEffect, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, Mic, MicOff, VolumeX, Volume2, Edit2, Check } from "lucide-react"
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { toast } from 'react-hot-toast'
import { generateEnhancedContent, autoCompletePrompt } from '@/utils/Gpt-4o'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateContext } from '@/app/(context)/UpdateContext'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { voiceGen } from '@/utils/schema'

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const tones = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'professional', label: 'Professional' },
]

const outputLengths = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
]

export default function EnhancedVoiceAIContentGenerator() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiOutput, setAiOutput] = useState('')
  const [tone, setTone] = useState('neutral')
  const [outputLength, setOutputLength] = useState('medium')
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [sensitivity, setSensitivity] = useState(50)
  const editorRef = useRef<Editor>(null)
  const recognitionRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const { user } = useUser()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
      }
      setVoices(window.speechSynthesis.getVoices())
      window.speechSynthesis.onvoiceschanged = () => setVoices(window.speechSynthesis.getVoices())
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      editorInstance.setMarkdown(aiOutput)
    }
  }, [aiOutput])

  const handleListen = async () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      setIsListening(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioContextRef.current = new AudioContext()
        sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream)
        analyserRef.current = audioContextRef.current.createAnalyser()
        sourceNodeRef.current.connect(analyserRef.current)

        recognitionRef.current.start()
        setIsListening(true)

        let finalTranscript = ''
        let silenceTimer: NodeJS.Timeout | null = null
        const silenceThreshold = 3000 // 3 seconds of silence

        const resetSilenceTimer = () => {
          if (silenceTimer) clearTimeout(silenceTimer)
          silenceTimer = setTimeout(() => {
            recognitionRef.current.stop()
          }, silenceThreshold)
        }

        const checkAudioLevel = () => {
          if (!analyserRef.current) return
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
          if (average > sensitivity) {
            resetSilenceTimer()
          }
        }

        const audioCheckInterval = setInterval(checkAudioLevel, 100)

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' '
            } else {
              interimTranscript += transcript
            }
          }
          setTranscript(finalTranscript + interimTranscript)
          resetSilenceTimer()
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error)
          toast.error("Error in speech recognition. Please try again.")
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
          if (silenceTimer) clearTimeout(silenceTimer)
          clearInterval(audioCheckInterval)
          stream.getTracks().forEach(track => track.stop())
          if (audioContextRef.current) {
            audioContextRef.current.close()
          }
        }
      } catch (error) {
        console.error('Error accessing microphone:', error)
        toast.error("Error accessing microphone. Please check your permissions.")
      }
    }
  }

  const handleConfirmPrompt = async () => {
    if (!transcript.trim()) {
      toast.error("Please provide a prompt before confirming.")
      return
    }
    try {
      const completedPrompt = await autoCompletePrompt(transcript)
      setTranscript(completedPrompt)
      generateAIContent(completedPrompt)
    } catch (error) {
      console.error("Error in auto-completing prompt:", error)
      toast.error("Failed to auto-complete prompt. Please try again.")
    }
  }

  const generateAIContent = async (prompt: string) => {
    const creditsNeeded = Math.floor(Math.random() * (500 - 50 + 1) + 50)
    if (totalUsage + creditsNeeded > 100000) {
      toast.error("Not enough credits to generate content")
      return
    }

    setLoading(true)
    try {
      const aiResponse = await generateEnhancedContent(prompt, tone, outputLength)
      setAiOutput(aiResponse)
      setTotalUsage((prevUsage: number) => prevUsage + creditsNeeded)
      setupdatecredit?.(Date.now())
      await saveContentToDB(prompt, aiResponse)
      toast.success("Content generated successfully!")
    } catch (error) {
      console.error("Error generating AI content:", error)
      toast.error("Failed to generate content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(aiOutput)
        utterance.voice = voices[voiceIndex]
        utterance.onend = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
        setIsSpeaking(true)
      }
    } else {
      toast.error("Text-to-speech is not supported in this browser.")
    }
  }

  const handleEdit = async () => {
    const editPrompt = prompt("What changes would you like to make to the output?")
    if (editPrompt) {
      if (totalUsage + 50 > 100000) {
        toast.error("Not enough credits to make changes")
        return
      }

      setLoading(true)
      try {
        const editedContent = await generateEnhancedContent(aiOutput, tone, outputLength, editPrompt)
        setAiOutput(editedContent)
        setTotalUsage((prevUsage: number) => prevUsage + 50)
        setupdatecredit?.(Date.now())
        await saveContentToDB(transcript, editedContent)
        toast.success("Content updated successfully!")
      } catch (error) {
        console.error("Error editing AI content:", error)
        toast.error("Failed to update content. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  const saveContentToDB = async (prompt: string, content: string) => {
    if (!user?.id) return

    try {
      await db.insert(voiceGen).values({
        userId: user.id,
        prompt,
        output: content,
        tone,
        outputLength,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error saving content to DB:", error)
    }
  }

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 className="font-bold text-2xl mb-6 text-prim">Voice AI Content Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger style={{ cursor: 'url(/poin.png), auto' }}>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((t) => (
                <SelectItem key={t.value} value={t.value} style={{ cursor: 'url(/poin.png), auto' }}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={outputLength} onValueChange={setOutputLength}>
            <SelectTrigger style={{ cursor: 'url(/poin.png), auto' }}>
              <SelectValue placeholder="Select output length" />
            </SelectTrigger>
            <SelectContent>
              {outputLengths.map((len) => (
                <SelectItem key={len.value} value={len.value} style={{ cursor: 'url(/poin.png), auto' }}>
                  {len.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <span>Voice:</span>
            <Select value={voiceIndex.toString()} onValueChange={(value) => setVoiceIndex(parseInt(value))}>
              <SelectTrigger style={{ cursor: 'url(/poin.png), auto' }}>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice, index) => (
                  <SelectItem key={index} value={index.toString()} style={{ cursor: 'url(/poin.png), auto' }}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="sensitivity" className="text-sm font-medium">
              Microphone Sensitivity: {sensitivity}%
            </label>
            <Slider
              id="sensitivity"
              min={0}
              max={100}
              step={1}
              value={[sensitivity]}
              onValueChange={(value) => setSensitivity(value[0])}
            />
          </div>
        </div>
        <div className="mb-4 space-x-4">
          <Button
            onClick={handleListen}
            className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim text-back'} text-primary-foreground transition-colors duration-300`}
            disabled={loading}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Button>
          <Button
            onClick={handleSpeak}
            className={`${isSpeaking ? 'bg-red-500 hover:bg-red-600' : 'bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim text-back'} text-primary-foreground transition-colors duration-300`}
            disabled={loading || !aiOutput}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            {isSpeaking ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
            {isSpeaking ? 'Stop Speaking' : 'Speak Output'}
          </Button>
          <Button
            onClick={handleEdit}
            className="bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim text-back text-primary-foreground transition-colors duration-300"
            disabled={loading || !aiOutput}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Output
          </Button>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
            className="flex-grow p-2 border rounded"
            rows={4}
            style={{ cursor: 'url(/type.png), auto' }}
          />
          <Button
            onClick={handleConfirmPrompt}
            className="bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim text-back"
            disabled={loading || !transcript.trim()}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <Check className="mr-2  h-4 w-4" />
            Confirm
          </Button>
        </div>
        <div className="font-p border border-gray-200 rounded-lg overflow-hidden">
          <Editor
            ref={editorRef}
            initialValue={aiOutput || "AI-generated content will appear here..."}
            height="400px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            toolbarItems={[
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['ul', 'ol', 'task', 'indent', 'outdent'],
              ['table', 'image', 'link'],
              ['code', 'codeblock']
            ]}
          />
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Loader2Icon className="animate-spin mr-2" />
            <span>Processing...</span>
          </div>
        )}
      </div>
    </div>
  )
}