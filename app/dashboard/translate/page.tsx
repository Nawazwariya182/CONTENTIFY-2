'use client'

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, ArrowRightLeft, Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from 'react-hot-toast'
import { translateText } from '@/utils/trans'

export default function TranslatorComponent() {
  // Move languages array inside the component
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'zh', label: 'Chinese (Simplified)' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ar', label: 'Arabic' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'bn', label: 'Bengali' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'pa', label: 'Punjabi' },
    { value: 'de', label: 'German' },
    { value: 'jv', label: 'Javanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'fr', label: 'French' },
    { value: 'te', label: 'Telugu' },
    { value: 'mr', label: 'Marathi' },
    { value: 'tr', label: 'Turkish' },
    { value: 'ta', label: 'Tamil' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'ur', label: 'Urdu' },
    { value: 'it', label: 'Italian' },
    { value: 'th', label: 'Thai' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'pl', label: 'Polish' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'fa', label: 'Persian' },
    { value: 'ro', label: 'Romanian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'el', label: 'Greek' },
    { value: 'sv', label: 'Swedish' },
    { value: 'cs', label: 'Czech' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'he', label: 'Hebrew' },
    { value: 'id', label: 'Indonesian' },
    { value: 'ms', label: 'Malay' },
    { value: 'da', label: 'Danish' },
    { value: 'fi', label: 'Finnish' },
    { value: 'no', label: 'Norwegian' },
    { value: 'sk', label: 'Slovak' }
  ]

  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate")
      return
    }

    setIsTranslating(true)
    try {
      const result = await translateText(sourceText, sourceLanguage, targetLanguage)
      setTranslatedText(result)
      setIsExpanded(true)
      toast.success("Translation completed")
    } catch (error) {
      console.error("Translation error:", error)
      toast.error("Failed to translate. Please try again.")
    } finally {
      setIsTranslating(false)
    }
  }

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const speakText = (text: string, lang: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesisRef.current.speak(utterance)
      setIsSpeaking(true)
    }
  }

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-prim text-white p-6">
          <h2 className="text-3xl font-bold mb-2">AI Translator</h2>
          <p className="text-sm opacity-80">Bridging languages with advanced AI</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Select value={sourceLanguage} onValueChange={setSourceLanguage} disabled={isTranslating}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Source Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={swapLanguages} disabled={isTranslating}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
            <Select value={targetLanguage} onValueChange={setTargetLanguage} disabled={isTranslating}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Target Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate"
              rows={6}
              disabled={isTranslating}
              className="w-full p-4 border-2 border-acc rounded-lg resize-none text-lg"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => isSpeaking ? stopSpeaking() : speakText(sourceText, sourceLanguage)}
              disabled={!sourceText}
              className="absolute bottom-2 right-2"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4 text-acc" /> : <Volume2 className="h-4 w-4 text-acc" />}
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
              className="px-8 py-2 bg-prim text-white rounded-full hover:bg-acc transition-colors"
            >
              {isTranslating ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                'Translate'
              )}
            </Button>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
            <div className="relative mt-4">
              <Textarea
                value={translatedText}
                readOnly
                rows={6}
                className="w-full p-4 border-2 border-acc rounded-lg bg-gray-50 resize-none text-lg"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => isSpeaking ? stopSpeaking() : speakText(translatedText, targetLanguage)}
                disabled={!translatedText}
                className="absolute bottom-2 right-2"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4 text-acc" /> : <Volume2 className="h-4 w-4 text-acc" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}