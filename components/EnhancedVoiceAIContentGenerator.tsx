'use client'

import React, { useState, useRef, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Mic, MicOff, Edit2, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { enhancePrompt, generateContent } from '@/utils/Gpt-4o'
import { VoiceProcessor } from '@/utils/voice-processing'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateContext } from '@/app/(context)/UpdateContext'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { voiceGen } from '@/utils/schema'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

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

const THEME = {
  primary: {
    gradient: 'from-blue-600 to-purple-600',
    hover: 'from-blue-700 to-purple-700',
    text: 'text-black',
    border: 'border-purple-600',
  },
  secondary: {
    gradient: 'from-blue-100 to-purple-100',
    hover: 'from-blue-200 to-purple-200',
    text: 'text-black',
    border: 'border-purple-200',
  },
  accent: {
    gradient: 'from-indigo-500 to-purple-500',
    hover: 'from-indigo-600 to-purple-600',
    text: 'text-black',
    border: 'border-purple-500',
  }
} as const;

function EnhancedVoiceAIContentGenerator() {
  const [isListening, setIsListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiOutput, setAiOutput] = useState('')
  const [tone, setTone] = useState('neutral')
  const [outputLength, setOutputLength] = useState('medium')
  const [activeTab, setActiveTab] = useState('input')
  const [sensitivity, setSensitivity] = useState(75)
  const [audioLevel, setAudioLevel] = useState(0)
  
  const editorRef = useRef<any>(null)
  const recognitionRef = useRef<any>(null)
  const voiceProcessorRef = useRef<VoiceProcessor | null>(null)
  const animationFrameRef = useRef<number>()
  
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const { user } = useUser()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'
      }
      voiceProcessorRef.current = new VoiceProcessor()
    }

    return () => {
      if (voiceProcessorRef.current) {
        voiceProcessorRef.current.cleanup()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(aiOutput)
    }
  }, [aiOutput])

  const updateAudioLevel = () => {
    if (voiceProcessorRef.current && isListening) {
      const level = voiceProcessorRef.current.getAudioLevel()
      setAudioLevel(level)
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
    }
  }

  const handleListen = async () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      if (voiceProcessorRef.current) {
        voiceProcessorRef.current.cleanup()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setIsListening(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { 
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        })

        await voiceProcessorRef.current?.initialize(stream, sensitivity)
        updateAudioLevel()

        recognitionRef.current.start()
        setIsListening(true)

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ''
          let finalTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' '
            } else {
              interimTranscript += transcript
            }
          }
          
          setTranscript(prev => prev + finalTranscript)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error)
          toast.error("Error in speech recognition. Please try again.")
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
          stream.getTracks().forEach(track => track.stop())
          if (voiceProcessorRef.current) {
            voiceProcessorRef.current.cleanup()
          }
        }
      } catch (error) {
        console.error('Error accessing microphone:', error)
        toast.error("Error accessing microphone. Please check your permissions.")
      }
    }
  }

  const handleSensitivityChange = (value: number[]) => {
    const newSensitivity = value[0]
    setSensitivity(newSensitivity)
    if (voiceProcessorRef.current) {
      voiceProcessorRef.current.updateSensitivity(newSensitivity)
    }
  }

  const handleConfirmPrompt = async () => {
    if (!transcript.trim()) {
      toast.error("Please provide a prompt before confirming.")
      return
    }

    setLoading(true)
    try {
      const enhancedPrompt = await enhancePrompt(transcript)
      setTranscript(enhancedPrompt)
      await generateAIContent(enhancedPrompt)
      setActiveTab('output')
    } catch (error) {
      console.error("Error in processing prompt:", error)
      toast.error("Failed to process prompt. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateAIContent = async (prompt: string) => {
    const creditsNeeded = 100
    if (totalUsage + creditsNeeded > 20000) {
      toast.error("Not enough credits to generate content")
      return
    }

    try {
      const content = await generateContent(prompt, tone, outputLength)
      setAiOutput(content)
      setTotalUsage((prev: number) => prev + creditsNeeded)
      setupdatecredit?.(Date.now())
      await saveContentToDB(prompt, content)
      toast.success("Content generated successfully!")
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate content. Please try again.")
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
        createdAt: new Date(),
      })
    } catch (error) {
      console.error("Error saving to DB:", error)
    }
  }

  const handleEdit = async () => {
    const editPrompt = prompt("What changes would you like to make to the output?")
    if (editPrompt) {
      setLoading(true)
      try {
        const editedContent = await generateContent(aiOutput, tone, outputLength, editPrompt)
        setAiOutput(editedContent)
        toast.success("Content updated successfully!")
      } catch (error) {
        toast.error("Failed to update content")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="max-w-5xl mx-auto border border-purple-100">
        <CardHeader className={`bg-gradient-to-r ${THEME.primary.gradient}`}>
          <CardTitle className="text-2xl md:text-3xl font-bold text-white">
            AI Content Generator
          </CardTitle>
          <CardDescription className="text-white/90">
            Transform your voice or text into enhanced content with AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger 
                className={`w-full border-2 hover:border-purple-400 transition-colors ${THEME.primary.border}`}
                style={{ cursor: 'url(/poin.png), auto' }}
              >
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((t) => (
                  <SelectItem 
                    key={t.value} 
                    value={t.value}
                    className="hover:bg-purple-50"
                    style={{ cursor: 'url(/poin.png), auto' }}
                  >
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={outputLength} onValueChange={setOutputLength}>
              <SelectTrigger 
                className={`w-full border-2 hover:border-purple-400 transition-colors ${THEME.primary.border}`}
                style={{ cursor: 'url(/poin.png), auto' }}
              >
                <SelectValue placeholder="Select output length" />
              </SelectTrigger>
              <SelectContent>
                {outputLengths.map((len) => (
                  <SelectItem 
                    key={len.value} 
                    value={len.value}
                    className="hover:bg-purple-50"
                    style={{ cursor: 'url(/poin.png), auto' }}
                  >
                    {len.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Microphone Sensitivity: {sensitivity}%
              </label>
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div 
                  className={`h-full bg-gradient-to-r ${THEME.accent.gradient} transition-all duration-100`}
                  style={{ width: `${(audioLevel / 255) * 100}%` }}
                />
              </div>
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[sensitivity]}
              onValueChange={handleSensitivityChange}
              className={`[&>span:first-child]:bg-gradient-to-r [&>span:first-child]:${THEME.primary.gradient}`}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-purple-50 rounded-lg">
              <TabsTrigger 
                value="input"
                className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${THEME.primary.gradient} data-[state=active]:text-black`}
                style={{ cursor: 'url(/poin.png), auto' }}
              >
                Input
              </TabsTrigger>
              <TabsTrigger 
                value="output"
                className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${THEME.primary.gradient} data-[state=active]:text-black`}
                style={{ cursor: 'url(/poin.png), auto' }}
              >
                Output
              </TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="space-y-4 pt-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={handleListen}
                          className={`flex-1 ${
                            isListening 
                              ? 'bg-red-500 hover:bg-red-600' 
                              : `bg-gradient-to-r ${THEME.primary.gradient} hover:${THEME.primary.hover}`
                          } text-white transition-all duration-300`}
                          disabled={loading}
                          style={{ cursor: 'url(/poin.png), auto' }}
                        >
                          {isListening ? (
                            <>
                              <MicOff className="mr-2 h-4 w-4" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="mr-2 h-4 w-4" />
                              Start Recording
                            </>
                          )}
                        </Button>
                      </TooltipTrigger >
                      <TooltipContent>
                        <p>Click to start/stop voice recording</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Your input will appear here. You can also type directly..."
                    className={`flex-1 min-h-[200px] border-2 ${THEME.primary.border} focus:ring-purple-400`}
                    style={{ cursor: 'url(/type.png), auto' }}
                  />
                  <Button
                    onClick={handleConfirmPrompt}
                    className={`self-start bg-gradient-to-r ${THEME.primary.gradient} hover:${THEME.primary.hover} text-white transition-all duration-300`}
                    disabled={loading || !transcript.trim()}
                    style={{ cursor: 'url(/poin.png), auto' }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="output" className="space-y-4 pt-4">
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <Button
                  onClick={handleEdit}
                  className={`flex-1 bg-gradient-to-r ${THEME.secondary.gradient} hover:${THEME.secondary.hover} ${THEME.secondary.text}`}
                  disabled={loading || !aiOutput}
                  style={{ cursor: 'url(/poin.png), auto' }}
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Output
                </Button>
              </div>
              <div className="border-2 rounded-lg overflow-hidden bg-white border-purple-100">
                <Editor
                  ref={editorRef}
                  initialValue={aiOutput || "Generated content will appear here..."}
                  height="400px"
                  initialEditType="wysiwyg"
                  useCommandShortcut={true}
                  theme="light"
                  toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock']
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>

          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className={`animate-spin rounded-full h-8 w-8 border-2 border-t-transparent ${THEME.primary.border}`} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default EnhancedVoiceAIContentGenerator

