/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
"use client"

import { useState, useRef, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, Volume2, VolumeX, ArrowLeft } from "lucide-react"
import { toast } from "react-hot-toast"
import { translateText, detectLanguage } from "@/utils/trans"
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext"
import { UpdateContext } from "@/app/(context)/UpdateContext"
import Link from "next/link"

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "technical", label: "Technical" },
]

const languages = [
  { value: "ar", label: "Arabic" },
  { value: "bn", label: "Bengali" },
  { value: "zh", label: "Chinese (Simplified)" },
  { value: "cs", label: "Czech" },
  { value: "da", label: "Danish" },
  { value: "nl", label: "Dutch" },
  { value: "en", label: "English" },
  { value: "fi", label: "Finnish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "gu", label: "Gujarati" },
  { value: "he", label: "Hebrew" },
  { value: "hi", label: "Hindi" },
  { value: "hu", label: "Hungarian" },
  { value: "id", label: "Indonesian" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "jv", label: "Javanese" },
  { value: "ko", label: "Korean" },
  { value: "ms", label: "Malay" },
  { value: "mr", label: "Marathi" },
  { value: "no", label: "Norwegian" },
  { value: "fa", label: "Persian" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese" },
  { value: "pa", label: "Punjabi" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "sa", label: "Sanskrit" },
  { value: "sk", label: "Slovak" },
  { value: "es", label: "Spanish" },
  { value: "sv", label: "Swedish" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "th", label: "Thai" },
  { value: "tr", label: "Turkish" },
  { value: "uk", label: "Ukrainian" },
  { value: "ur", label: "Urdu" },
  { value: "vi", label: "Vietnamese" },
].sort((a, b) => a.label.localeCompare(b.label))

function EnhancedTranslatorComponent() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText1, setTranslatedText1] = useState("")
  const [translatedText2, setTranslatedText2] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("")
  const [targetLanguage1, setTargetLanguage1] = useState("en")
  const [targetLanguage2, setTargetLanguage2] = useState("")
  const [tone, setTone] = useState("professional")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)

  useEffect(() => {
    if (sourceText) {
      const detectTimer = setTimeout(async () => {
        try {
          const detectedLang = await detectLanguage(sourceText)
          setSourceLanguage(detectedLang)
        } catch (error) {
          console.error("Language detection error:", error)
        }
      }, 1000)

      return () => clearTimeout(detectTimer)
    }
  }, [sourceText])

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate")
      return
    }

    const creditsNeeded = targetLanguage2 ? 200 : 100

    if (totalUsage + creditsNeeded > 20000) {
      toast.error("Not enough credits for translation")
      return
    }

    setIsTranslating(true)
    try {
      const detectedSourceLang = sourceLanguage || (await detectLanguage(sourceText))

      const [result1, result2] = await Promise.all([
        translateText(sourceText, detectedSourceLang, targetLanguage1, tone),
        targetLanguage2 ? translateText(sourceText, detectedSourceLang, targetLanguage2, tone) : Promise.resolve(""),
      ])

      setTranslatedText1(result1)
      setTranslatedText2(result2)

      setupdatecredit?.(Date.now())

      toast.success("Translation completed")
    } catch (error) {
      console.error("Translation error:", error)
      toast.error("Failed to translate. Please try again.")
    } finally {
      setIsTranslating(false)
    }
  }

  const speakText = (text: string, lang: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
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
    <div className="min-h-screen bg-white flex mb-0 mt-0 justify-center p-4">
      <div className="w-full max-w-9xl m-0 bg-white rounded-lg  overflow-hidden">
        <div className="bg-white text-prim p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">AI Translator</h2>
            <p className="text-sm opacity-80">Powered by Gemini AI with customizable tones</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Input Section (Left) */}
          <div className="lg:w-1/2 p-6 border-r border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Input</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select value={sourceLanguage} onValueChange={setSourceLanguage} disabled={isTranslating}>
                  <SelectTrigger className="w-full" style={{ cursor: "url(/poin.png), auto" }}>
                    <SelectValue placeholder="Detected Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value} style={{ cursor: "url(/poin.png), auto" }}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={tone} onValueChange={setTone} disabled={isTranslating}>
                  <SelectTrigger className="w-full" style={{ cursor: "url(/poin.png), auto" }}>
                    <SelectValue placeholder="Select Tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value} style={{ cursor: "url(/poin.png), auto" }}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Enter text to translate"
                  rows={10}
                  disabled={isTranslating}
                  style={{ cursor: "url(/type.png), auto" }}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isSpeaking ? stopSpeaking() : speakText(sourceText, sourceLanguage))}
                  disabled={!sourceText}
                  className="absolute bottom-2 right-2"
                  style={{ cursor: "url(/poin.png), auto" }}
                >
                  {isSpeaking ? (
                    <VolumeX className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>

              <Button
                onClick={handleTranslate}
                disabled={isTranslating || !sourceText.trim()}
                className="w-full py-2 bg-prim text-white rounded-full hover:bg-acc hover:text-white/80 transition-all duration-300 transform "
                style={{ cursor: "url(/poin.png), auto" }}
              >
                {isTranslating ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  "Translate"
                )}
              </Button>
            </div>
          </div>

          {/* Output Section (Right) */}
          <div className="lg:w-1/2 p-6 bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Output</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <Select value={targetLanguage1} onValueChange={setTargetLanguage1} disabled={isTranslating}>
                  <SelectTrigger className="w-full" style={{ cursor: "url(/poin.png), auto" }}>
                    <SelectValue placeholder="Target Language 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value} style={{ cursor: "url(/poin.png), auto" }}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={targetLanguage2} onValueChange={setTargetLanguage2} disabled={isTranslating}>
                  <SelectTrigger className="w-full" style={{ cursor: "url(/poin.png), auto" }}>
                    <SelectValue placeholder="Target Language 2 (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value} style={{ cursor: "url(/poin.png), auto" }}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Textarea
                  value={translatedText1}
                  readOnly
                  rows={5}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-white resize-none text-lg"
                  style={{ cursor: "url(/type.png), auto" }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isSpeaking ? stopSpeaking() : speakText(translatedText1, targetLanguage1))}
                  disabled={!translatedText1}
                  className="absolute bottom-2 right-2"
                  style={{ cursor: "url(/poin.png), auto" }}
                >
                  {isSpeaking ? (
                    <VolumeX className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>

              {targetLanguage2 && (
                <div className="relative mt-4">
                  <Textarea
                    value={translatedText2}
                    readOnly
                    rows={5}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg bg-white resize-none text-lg"
                    style={{ cursor: "url(/type.png), auto" }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (isSpeaking ? stopSpeaking() : speakText(translatedText2, targetLanguage2))}
                    disabled={!translatedText2}
                    className="absolute bottom-2 right-2"
                    style={{ cursor: "url(/poin.png), auto" }}
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedTranslatorComponent
