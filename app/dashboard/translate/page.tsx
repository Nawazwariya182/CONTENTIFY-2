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
import { Loader2Icon, Volume2, VolumeX, Copy, Check, RefreshCcw, Trash2 } from "lucide-react" // updated icons
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
  const [copied, setCopied] = useState<{ t1: boolean; t2: boolean }>({ t1: false, t2: false }) // new
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const charCount = sourceText.length // new

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

  useEffect(() => {
    if (copied.t1 || copied.t2) {
      const timer = setTimeout(() => setCopied({ t1: false, t2: false }), 1800)
      return () => clearTimeout(timer)
    }
  }, [copied])

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
      setTotalUsage?.((prev: number) => prev + creditsNeeded) // update credits UI

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

  // NEW helpers
  const handleCopy = (text: string, key: "t1" | "t2") => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied((prev) => ({ ...prev, [key]: true }))
    toast.success("Copied")
  }

  const swapLanguages = () => {
    if (!targetLanguage1) return
    setSourceText(translatedText1 || sourceText)
    setTranslatedText1("")
    setTranslatedText2("")
    setTargetLanguage1(sourceLanguage || targetLanguage1)
    setSourceLanguage(targetLanguage1)
    toast("Languages swapped")
  }

  const clearAll = () => {
    setSourceText("")
    setTranslatedText1("")
    setTranslatedText2("")
    toast("Cleared")
  }

  const handleTarget2Change = (val: string) => {
    if (val === "none") {
      setTargetLanguage2("")
      setTranslatedText2("")
    } else {
      setTargetLanguage2(val)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-8 px-4 transition-colors">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
            AI Translator
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Multilingual, tone-aware translation powered by Gemini. Swap, listen, copy & refine instantly.
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
            <div className="relative rounded-2xl border border-white/40 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Select value={sourceLanguage} onValueChange={setSourceLanguage} disabled={isTranslating}>
                    <SelectTrigger className="w-full h-11 text-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur rounded-xl border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Detected Language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={tone} onValueChange={setTone} disabled={isTranslating}>
                    <SelectTrigger className="w-full h-11 text-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur rounded-xl border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative group">
                  <Textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Type or paste text here..."
                    rows={9}
                    disabled={isTranslating}
                    className="w-full text-base leading-relaxed rounded-xl border-2 border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-800/60 backdrop-blur focus-visible:ring-2 focus-visible:ring-indigo-500/60 resize-none pr-12"
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => (isSpeaking ? stopSpeaking() : speakText(sourceText, sourceLanguage))}
                      disabled={!sourceText}
                      className="h-8 w-8 rounded-lg border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-700"
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="absolute left-2 bottom-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {charCount} chars
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleTranslate}
                  disabled={isTranslating || !sourceText.trim()}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {isTranslating ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Translating
                    </>
                  ) : (
                    "Translate"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={swapLanguages}
                  disabled={!sourceLanguage || !targetLanguage1 || (!translatedText1 && !sourceText)}
                  className="h-11 px-4 rounded-xl border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-700"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearAll}
                  disabled={!sourceText && !translatedText1 && !translatedText2}
                  className="h-11 px-4 rounded-xl border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-rose-50 dark:hover:bg-slate-700"
                >
                  <Trash2 className="h-4 w-4 text-rose-500" />
                </Button>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-500">
                Credits used: {totalUsage} / 20000
              </div>
            </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/40 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl p-6 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select value={targetLanguage1} onValueChange={setTargetLanguage1} disabled={isTranslating}>
                  <SelectTrigger className="w-full h-11 text-sm rounded-xl bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Target Language 1" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={targetLanguage2 || "none"} onValueChange={handleTarget2Change} disabled={isTranslating}>
                  <SelectTrigger className="w-full h-11 text-sm rounded-xl bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Target Language 2 (Optional)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectItem value="none">None</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Primary Translation */}
              <div className="relative group">
                <Textarea
                  value={translatedText1}
                  readOnly
                  rows={5}
                  className="w-full text-base leading-relaxed rounded-xl border-2 border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-800/60 backdrop-blur resize-none pr-24"
                  placeholder="Translation will appear here..."
                />
                <div className="absolute right-2 bottom-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => (isSpeaking ? stopSpeaking() : speakText(translatedText1, targetLanguage1))}
                    disabled={!translatedText1}
                    className="h-8 w-8 rounded-lg border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-700"
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(translatedText1, "t1")}
                    disabled={!translatedText1}
                    className="h-8 w-8 rounded-lg border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-700"
                  >
                    {copied.t1 ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Secondary Translation */}
              {targetLanguage2 && (
                <div className="relative group">
                  <Textarea
                    value={translatedText2}
                    readOnly
                    rows={5}
                    className="w-full text-base leading-relaxed rounded-xl border-2 border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-800/60 backdrop-blur resize-none pr-24"
                    placeholder="Second translation will appear here..."
                  />
                  <div className="absolute right-2 bottom-2 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => (isSpeaking ? stopSpeaking() : speakText(translatedText2, targetLanguage2))}
                      disabled={!translatedText2}
                      className="h-8 w-8 rounded-lg border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-700"
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(translatedText2, "t2")}
                      disabled={!translatedText2}
                      className="h-8 w-8 rounded-lg border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-700"
                    >
                      {copied.t2 ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Info */}
            <p className="text-xs text-slate-500 dark:text-slate-500 px-1">
              Tip: Use Swap after translating to reverse direction instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedTranslatorComponent
