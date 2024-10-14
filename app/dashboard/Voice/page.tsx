'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Loader2Icon, Mic, MicOff, VolumeX, Volume2 } from "lucide-react"
import { toast } from 'react-hot-toast'
import { generateCombinedText } from '@/utils/Gpt-4o'

const Editor = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Editor), {
  ssr: false,
})

import '@toast-ui/editor/dist/toastui-editor.css'

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

export default function VoiceAIContentGenerator() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState('')
  const editorRef = useRef<any>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
      }
      synthRef.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      editorInstance.setMarkdown(aiOutput)
    }
  }, [aiOutput])

  const handleListen = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      let finalTranscript = ''

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }
        setAiOutput(finalTranscript)
      }

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error)
        toast.error("Error in speech recognition. Please try again.")
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (finalTranscript) {
          generateAIContent(finalTranscript)
        }
        setIsListening(false)
      }
    }
  }

  const generateAIContent = async (transcript: string) => {
    setLoading(true)
    try {
      const aiResponse = await generateCombinedText(transcript)
      setAiOutput(aiResponse)
      toast.success("Content generated successfully!")
    } catch (error) {
      console.error("Error generating AI content:", error)
      toast.error("Failed to generate content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSpeak = () => {
    if (!synthRef.current) {
      toast.error("Text-to-speech is not supported in this browser.")
      return
    }

    if (isSpeaking) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(aiOutput)
      utterance.onend = () => setIsSpeaking(false)
      synthRef.current.speak(utterance)
      setIsSpeaking(true)
    }
  }

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 className="font-bold text-2xl mb-6 text-prim">Voice AI Content Generator</h2>
        <div className="mb-4 space-x-4">
          <Button
            onClick={handleListen}
            className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-prim hover:bg-acc'} text-back transition-colors duration-300`}
            disabled={loading}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Button>
          <Button
            onClick={handleSpeak}
            className={`${isSpeaking ? 'bg-red-500 hover:bg-red-600' : 'bg-prim hover:bg-acc'} text-back transition-colors duration-300`}
            disabled={loading || !aiOutput}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            {isSpeaking ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
            {isSpeaking ? 'Stop Speaking' : 'Speak Output'}
          </Button>
        </div>
        <div className="font-p border border-gray-200 rounded-lg overflow-hidden">
          <Editor
            ref={editorRef}
            initialValue={aiOutput || "Speak your prompt, and the AI-generated content will appear here..."}
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