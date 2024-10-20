'use client'

import React, { useState, useRef, useContext, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, ArrowRightLeft, Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from 'react-hot-toast'
import { translateText, detectLanguage } from '@/utils/trans'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateContext } from '@/app/(context)/UpdateContext'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { translate } from '@/utils/schema'

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'technical', label: 'Technical' },
]

export const languages = [
  { value: 'ar', label: 'Arabic' },
  { value: 'bn', label: 'Bengali' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'cs', label: 'Czech' },
  { value: 'da', label: 'Danish' },
  { value: 'nl', label: 'Dutch' },
  { value: 'en', label: 'English' },
  { value: 'fi', label: 'Finnish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'el', label: 'Greek' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'he', label: 'Hebrew' },
  { value: 'hi', label: 'Hindi' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'id', label: 'Indonesian' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'jv', label: 'Javanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ms', label: 'Malay' },
  { value: 'mr', label: 'Marathi' },
  { value: 'no', label: 'Norwegian' },
  { value: 'fa', label: 'Persian' },
  { value: 'pl', label: 'Polish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'ro', label: 'Romanian' },
  { value: 'ru', label: 'Russian' },
  { value: 'sa', label: 'Sanskrit' },
  { value: 'sk', label: 'Slovak' },
  { value: 'es', label: 'Spanish' },
  { value: 'sv', label: 'Swedish' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'th', label: 'Thai' },
  { value: 'tr', label: 'Turkish' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'ur', label: 'Urdu' },
  { value: 'vi', label: 'Vietnamese' },
].sort((a, b) => a.label.localeCompare(b.label))

export default function EnhancedTranslatorComponent() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText1, setTranslatedText1] = useState('')
  const [translatedText2, setTranslatedText2] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('')
  const [targetLanguage1, setTargetLanguage1] = useState('en')
  const [targetLanguage2, setTargetLanguage2] = useState('')
  const [tone, setTone] = useState('professional')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const { user } = useUser()

  useEffect(() => {
    if (sourceText) {
      detectLanguage(sourceText).then(setSourceLanguage)
    }
  }, [sourceText])

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate")
      return
    }

    const creditsNeeded = targetLanguage2 ? Math.floor(Math.random() * (400 - 100 + 1) + 100) : Math.floor(Math.random() * (200 - 50 + 1) + 50)

    if (totalUsage + creditsNeeded > 100000) {
      toast.error("Not enough credits for translation")
      return
    }

    setIsTranslating(true)
    try {
      const [result1, result2] = await Promise.all([
        translateText(sourceText, sourceLanguage, targetLanguage1, tone),
        targetLanguage2 ? translateText(sourceText, sourceLanguage, targetLanguage2, tone) : Promise.resolve('')
      ])

      setTranslatedText1(result1)
      setTranslatedText2(result2)
      setIsExpanded(true)
      
      await saveTranslationToDB(sourceText, sourceLanguage, [
        { language: targetLanguage1, text: result1 },
        ...(targetLanguage2 ? [{ language: targetLanguage2, text: result2 }] : [])
      ])

      // setTotalUsage(prevUsage => prevUsage + creditsNeeded)
      setupdatecredit?.(Date.now())
      
      toast.success("Translation completed")
    } catch (error) {
      console.error("Translation error:", error)
      toast.error("Failed to translate. Please try again.")
    } finally {
      setIsTranslating(false)
    }
  }

  const saveTranslationToDB = async (sourceText: string, sourceLanguage: string, translations: { language: string, text: string }[]) => {
    if (!user?.id) return

    try {
      await db.insert(translate).values({
        userId: user.id,
        sourceText,
        sourceLanguage,
        translations: JSON.stringify(translations),
        tone,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error saving translation to DB:", error)
    }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h2 className="text-3xl font-bold mb-2"> AI Translator</h2>
          <p className="text-sm opacity-80">Bridging languages with advanced AI and customizable tones</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={sourceLanguage} onValueChange={setSourceLanguage} disabled={isTranslating}>
              <SelectTrigger className="w-[200px]" style={{ cursor: 'url(/poin.png), auto' }}>
                <SelectValue placeholder="Detected Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}style={{ cursor: 'url(/poin.png), auto' }}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={targetLanguage1} onValueChange={setTargetLanguage1} disabled={isTranslating}>
              <SelectTrigger className="w-[200px]" style={{ cursor: 'url(/poin.png), auto' }}>
                <SelectValue placeholder="Target Language 1" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} style={{ cursor: 'url(/poin.png), auto' }}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={targetLanguage2} onValueChange={setTargetLanguage2} disabled={isTranslating}>
              <SelectTrigger className="w-[200px]"style={{ cursor: 'url(/poin.png), auto' }}>
                <SelectValue placeholder="Target Language 2 (Optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} style={{ cursor: 'url(/poin.png), auto' }}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tone} onValueChange={setTone} disabled={isTranslating}>
              <SelectTrigger className="w-[200px]"style={{ cursor: 'url(/poin.png), auto' }}>
                <SelectValue placeholder="Select Tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((t) => (
                  <SelectItem key={t.value} value={t.value}style={{ cursor: 'url(/poin.png), auto' }}>{t.label}</SelectItem>
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
              style={{ cursor: 'url(/type.png), auto' }}
              className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => isSpeaking ? stopSpeaking() : speakText(sourceText, sourceLanguage)}
              disabled={!sourceText}
              className="absolute bottom-2 right-2"
              style={{ cursor: 'url(/poin.png), auto' }}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4 text-gray-500" style={{ cursor: 'url(/poin.png), auto' }}/> : <Volume2 className="h-4 w-4 text-gray-500" style={{ cursor: 'url(/poin.png), auto' }}/>}
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
              style={{ cursor: 'url(/poin.png), auto' }}
              className="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
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
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  value={translatedText1}
                  readOnly
                  rows={6}
                  style={{ cursor: 'url(/type.png), auto' }}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 resize-none text-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(translatedText1, targetLanguage1)}
                  disabled={!translatedText1}
                  style={{ cursor: 'url(/poin.png), auto' }}
                  className="absolute bottom-2 right-2"
                >
                  {isSpeaking ? <VolumeX className="h-4 w-4 text-gray-500"style={{ cursor: 'url(/poin.png), auto' }} /> : <Volume2 className="h-4 w-4 text-gray-500" style={{ cursor: 'url(/poin.png), auto' }}/>}
                </Button>
              </div>
              {targetLanguage2 && (
                <div className="relative">
                  <Textarea
                    value={translatedText2}
                    readOnly
                    rows={6}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 resize-none text-lg"
                    style={{ cursor: 'url(/type.png), auto' }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isSpeaking ? stopSpeaking() : speakText(translatedText2, targetLanguage2)}
                    disabled={!translatedText2}
                    className="absolute bottom-2 right-2"
                    style={{ cursor: 'url(/poin.png), auto' }}
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4 text-gray-500"style={{ cursor: 'url(/poin.png), auto' }} /> : <Volume2 className="h-4 w-4 text-gray-500" style={{ cursor: 'url(/poin.png), auto' }}/>}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div 
          className="bg-gray-100 p-2 flex justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-gray-600" style={{ cursor: 'url(/poin.png), auto' }}/>
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-600" style={{ cursor: 'url(/poin.png), auto' }} />
          )}
        </div>
      
      </div>
    </div>
  )
}