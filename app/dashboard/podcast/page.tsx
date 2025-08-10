/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

"use client"

import type React from "react"
import { useState, useContext, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  MicIcon,
  Loader2Icon,
  Download,
  Play,
  Pause,
  Volume2,
  Save,
  FileText,
  MessageSquare,
  Settings,
  Users,
  Globe,
  AlertCircle,
  Languages,
  CheckCircle,
} from "lucide-react"
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext"
import { AudioProcessor } from "@/utils/audioProcessor"

const languages = [
  {
    code: "en-US",
    name: "English",
    flag: "🇺🇸",
    region: "United States",
    nativeName: "English",
    sampleText: "Hello! Welcome to our podcast today.",
  },
  {
    code: "hi-IN",
    name: "Hindi",
    flag: "🇮🇳",
    region: "India",
    nativeName: "हिंदी",
    sampleText: "नमस्ते! आज हमारे पॉडकास्ट में आपका स्वागत है।",
  },
  {
    code: "mr-IN",
    name: "Marathi",
    flag: "🇮🇳",
    region: "Maharashtra",
    nativeName: "मराठी",
    sampleText: "नमस्कार! आजच्या आमच्या पॉडकास्टमध्ये तुमचे स्वागत आहे।",
  },
  {
    code: "gu-IN",
    name: "Gujarati",
    flag: "🇮🇳",
    region: "Gujarat",
    nativeName: "ગુજરાતી",
    sampleText: "નમસ્તે! આજે અમારા પોડકાસ્ટમાં તમારું સ્વાગત છે।",
  },
  {
    code: "ta-IN",
    name: "Tamil",
    flag: "🇮🇳",
    region: "Tamil Nadu",
    nativeName: "தமிழ்",
    sampleText: "வணக்கம்! இன்று எங்கள் பாட்காஸ்டில் உங்களை வரவேற்கிறோம்.",
  },
  {
    code: "te-IN",
    name: "Telugu",
    flag: "🇮🇳",
    region: "Andhra Pradesh",
    nativeName: "తెలుగు",
    sampleText: "నమస్కారం! ఈ రోజు మా పాడ్‌కాస్ట్‌కు మిమ్మల్ని స్వాగతం చేస్తున్నాము.",
  },
  {
    code: "kn-IN",
    name: "Kannada",
    flag: "🇮🇳",
    region: "Karnataka",
    nativeName: "ಕನ್ನಡ",
    sampleText: "ನಮಸ್ಕಾರ! ಇಂದು ನಮ್ಮ ಪಾಡ್‌ಕಾಸ್ಟ್‌ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ.",
  },
  {
    code: "bn-IN",
    name: "Bengali",
    flag: "🇮🇳",
    region: "West Bengal",
    nativeName: "বাংলা",
    sampleText: "নমস্কার! আজ আমাদের পডকাস্টে আপনাদের স্বাগতম।",
  },
  {
    code: "pa-IN",
    name: "Punjabi",
    flag: "🇮🇳",
    region: "Punjab",
    nativeName: "ਪੰਜਾਬੀ",
    sampleText: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਅੱਜ ਸਾਡੇ ਪੌਡਕਾਸਟ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।",
  },
  {
    code: "es-ES",
    name: "Spanish",
    flag: "🇪🇸",
    region: "Spain",
    nativeName: "Español",
    sampleText: "¡Hola! Bienvenidos a nuestro podcast de hoy.",
  },
  {
    code: "fr-FR",
    name: "French",
    flag: "🇫🇷",
    region: "France",
    nativeName: "Français",
    sampleText: "Bonjour! Bienvenue dans notre podcast d'aujourd'hui.",
  },
  {
    code: "de-DE",
    name: "German",
    flag: "🇩🇪",
    region: "Germany",
    nativeName: "Deutsch",
    sampleText: "Hallo! Willkommen zu unserem heutigen Podcast.",
  },
  {
    code: "it-IT",
    name: "Italian",
    flag: "🇮🇹",
    region: "Italy",
    nativeName: "Italiano",
    sampleText: "Ciao! Benvenuti al nostro podcast di oggi.",
  },
  {
    code: "pt-BR",
    name: "Portuguese",
    flag: "🇧🇷",
    region: "Brazil",
    nativeName: "Português",
    sampleText: "Olá! Bem-vindos ao nosso podcast de hoje.",
  },
  {
    code: "ja-JP",
    name: "Japanese",
    flag: "🇯🇵",
    region: "Japan",
    nativeName: "日本語",
    sampleText: "こんにちは！今日のポッドキャストへようこそ。",
  },
  {
    code: "ko-KR",
    name: "Korean",
    flag: "🇰🇷",
    region: "South Korea",
    nativeName: "한국어",
    sampleText: "안녕하세요! 오늘 팟캐스트에 오신 것을 환영합니다.",
  },
  {
    code: "zh-CN",
    name: "Chinese",
    flag: "🇨🇳",
    region: "China",
    nativeName: "中文",
    sampleText: "你好！欢迎收听今天的播客。",
  },
  {
    code: "ar-SA",
    name: "Arabic",
    flag: "🇸🇦",
    region: "Saudi Arabia",
    nativeName: "العربية",
    sampleText: "مرحبا! أهلا بكم في البودكاست اليوم.",
  },
  {
    code: "ru-RU",
    name: "Russian",
    flag: "🇷🇺",
    region: "Russia",
    nativeName: "Русский",
    sampleText: "Привет! Добро пожаловать в наш сегодняшний подкаст.",
  },
]

interface EnhancedVoice {
  voice: SpeechSynthesisVoice
  name: string
  gender: "Male" | "Female" | "Unknown"
  accent: string
  region: string
  quality: "High" | "Medium" | "Basic"
  naturalness: number
}

interface VoiceSettings {
  rate: number
  pitch: number
  volume: number
  pauseBefore: number
  pauseAfter: number
}

interface PodcastSettings {
  speaker1: VoiceSettings
  speaker2: VoiceSettings
  globalPause: number
  addFillers: boolean
  naturalPauses: boolean
  conversationalTone: boolean
}

export default function PodcastGenerator() {
  const [title, setTitle] = useState("")
  const [mode, setMode] = useState<"topic" | "content">("topic")
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("en-US")
  const [speaker1Name, setSpeaker1Name] = useState("Alex")
  const [speaker2Name, setSpeaker2Name] = useState("Sarah")
  const [speaker1Voice, setSpeaker1Voice] = useState<SpeechSynthesisVoice | null>(null)
  const [speaker2Voice, setSpeaker2Voice] = useState<SpeechSynthesisVoice | null>(null)
  const [availableVoices, setAvailableVoices] = useState<EnhancedVoice[]>([])
  const [script, setScript] = useState("")
  const [audioUrl, setAudioUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState("")
  const [recordingProgress, setRecordingProgress] = useState(0)
  const [audioSize, setAudioSize] = useState(0)
  const [settings, setSettings] = useState<PodcastSettings>({
    speaker1: {
      rate: 0.85,
      pitch: 0.9,
      volume: 1.0,
      pauseBefore: 800,
      pauseAfter: 1200,
    },
    speaker2: {
      rate: 0.9,
      pitch: 1.1,
      volume: 1.0,
      pauseBefore: 700,
      pauseAfter: 1000,
    },
    globalPause: 1500,
    addFillers: true,
    naturalPauses: true,
    conversationalTone: true,
  })

  const audioRef = useRef<HTMLAudioElement>(null)
  const audioProcessorRef = useRef<AudioProcessor | null>(null)
  const { toast } = useToast()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)

  // Initialize audio processor
  useEffect(() => {
    audioProcessorRef.current = new AudioProcessor()
  }, [])

  // Enhanced voice detection and categorization
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      const currentLang = language.split("-")[0]

      const enhancedVoices = voices
        .filter((voice) => {
          return (
            voice.lang.toLowerCase().includes(currentLang.toLowerCase()) ||
            voice.lang.toLowerCase().includes(language.toLowerCase())
          )
        })
        .map((voice): EnhancedVoice => {
          const name = voice.name.toLowerCase()
          let gender: "Male" | "Female" | "Unknown" = "Unknown"

          // Enhanced gender detection
          if (
            name.includes("female") ||
            name.includes("woman") ||
            name.includes("samantha") ||
            name.includes("susan") ||
            name.includes("victoria") ||
            name.includes("karen") ||
            name.includes("moira") ||
            name.includes("tessa") ||
            name.includes("fiona") ||
            name.includes("veena") ||
            name.includes("rishi") ||
            name.includes("kalpana") ||
            name.includes("lekha") ||
            name.includes("aditi") ||
            name.includes("priya")
          ) {
            gender = "Female"
          } else if (
            name.includes("male") ||
            name.includes("man") ||
            name.includes("daniel") ||
            name.includes("alex") ||
            name.includes("fred") ||
            name.includes("ralph") ||
            name.includes("aaron") ||
            name.includes("ravi") ||
            name.includes("hemant") ||
            name.includes("arjun") ||
            name.includes("vikram")
          ) {
            gender = "Male"
          }

          // Enhanced accent detection
          let accent = voice.lang
          let region = "Standard"

          if (voice.lang.includes("US")) {
            accent = "American English"
            region = "United States"
          } else if (voice.lang.includes("GB")) {
            accent = "British English"
            region = "United Kingdom"
          } else if (voice.lang.includes("IN")) {
            accent = "Indian"
            region = "India"
          } else if (voice.lang.includes("hi")) {
            accent = "Hindi"
            region = "India"
          } else if (voice.lang.includes("mr")) {
            accent = "Marathi"
            region = "Maharashtra"
          } else if (voice.lang.includes("gu")) {
            accent = "Gujarati"
            region = "Gujarat"
          }

          // Quality assessment
          let quality: "High" | "Medium" | "Basic" = "Medium"
          let naturalness = 0.6

          if (voice.localService === false) {
            quality = "High"
            naturalness = 0.9
          } else if (name.includes("enhanced") || name.includes("premium")) {
            quality = "High"
            naturalness = 0.8
          } else if (name.includes("compact") || name.includes("basic")) {
            quality = "Basic"
            naturalness = 0.4
          }

          return {
            voice,
            name: voice.name,
            gender,
            accent,
            region,
            quality,
            naturalness,
          }
        })
        .sort((a, b) => {
          const qualityOrder = { High: 3, Medium: 2, Basic: 1 }
          if (a.quality !== b.quality) {
            return qualityOrder[b.quality] - qualityOrder[a.quality]
          }
          return b.naturalness - a.naturalness
        })

      setAvailableVoices(enhancedVoices)

      // Auto-select diverse voices
      if (enhancedVoices.length >= 2) {
        const maleVoices = enhancedVoices.filter((v) => v.gender === "Male")
        const femaleVoices = enhancedVoices.filter((v) => v.gender === "Female")

        if (maleVoices.length > 0 && femaleVoices.length > 0) {
          setSpeaker1Voice(femaleVoices[0].voice)
          setSpeaker2Voice(maleVoices[0].voice)
        } else {
          setSpeaker1Voice(enhancedVoices[0].voice)
          setSpeaker2Voice(enhancedVoices[1].voice)
        }
      }
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
  }, [language])

  // Update speaker names based on language
  useEffect(() => {
    const selectedLang = languages.find((l) => l.code === language)
    if (selectedLang) {
      switch (selectedLang.code) {
        case "hi-IN":
          setSpeaker1Name("अनिता")
          setSpeaker2Name("राहुल")
          break
        case "mr-IN":
          setSpeaker1Name("प्रिया")
          setSpeaker2Name("अमित")
          break
        case "gu-IN":
          setSpeaker1Name("દીપા")
          setSpeaker2Name("રાજ")
          break
        case "ta-IN":
          setSpeaker1Name("கவிதா")
          setSpeaker2Name("ராம்")
          break
        case "te-IN":
          setSpeaker1Name("సుధా")
          setSpeaker2Name("రవి")
          break
        case "kn-IN":
          setSpeaker1Name("ಸುಮಿತ್ರಾ")
          setSpeaker2Name("ಅರುಣ್")
          break
        case "bn-IN":
          setSpeaker1Name("রীতা")
          setSpeaker2Name("অমিত")
          break
        case "pa-IN":
          setSpeaker1Name("ਸਿਮਰਨ")
          setSpeaker2Name("ਹਰਪ੍ਰੀਤ")
          break
        case "es-ES":
          setSpeaker1Name("María")
          setSpeaker2Name("Carlos")
          break
        case "fr-FR":
          setSpeaker1Name("Sophie")
          setSpeaker2Name("Pierre")
          break
        case "de-DE":
          setSpeaker1Name("Anna")
          setSpeaker2Name("Hans")
          break
        case "it-IT":
          setSpeaker1Name("Giulia")
          setSpeaker2Name("Marco")
          break
        case "pt-BR":
          setSpeaker1Name("Ana")
          setSpeaker2Name("João")
          break
        case "ja-JP":
          setSpeaker1Name("さくら")
          setSpeaker2Name("たろう")
          break
        case "ko-KR":
          setSpeaker1Name("지은")
          setSpeaker2Name("민수")
          break
        case "zh-CN":
          setSpeaker1Name("小红")
          setSpeaker2Name("小明")
          break
        case "ar-SA":
          setSpeaker1Name("فاطمة")
          setSpeaker2Name("أحمد")
          break
        case "ru-RU":
          setSpeaker1Name("Анна")
          setSpeaker2Name("Иван")
          break
        default:
          setSpeaker1Name("Alex")
          setSpeaker2Name("Sarah")
      }
    }
  }, [language])

  const playVoiceDemo = (voice: SpeechSynthesisVoice, speakerSettings: VoiceSettings) => {
    const selectedLang = languages.find((l) => l.code === language)
    const text = selectedLang?.sampleText || "Hello! Welcome to our podcast today."

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.rate = speakerSettings.rate
    utterance.pitch = speakerSettings.pitch
    utterance.volume = speakerSettings.volume
    utterance.lang = language

    speechSynthesis.speak(utterance)
  }

  const generateScript = async () => {
    setCurrentStep("Generating pure language script...")

    const selectedLang = languages.find((l) => l.code === language)
    const languageName = selectedLang?.nativeName || selectedLang?.name || "English"

    const pureLanguagePrompt = `IMPORTANT: Generate the ENTIRE script in ${languageName} language ONLY. Do NOT mix languages. Do NOT use English words if the selected language is not English. Use only native ${languageName} words and expressions.`

    const conversationalPrompt = settings.conversationalTone
      ? ` Make it very conversational with natural interruptions, agreements, and back-and-forth dialogue. Add natural speech patterns and expressions common in ${languageName}.`
      : ""

    const prompt =
      mode === "topic"
        ? `${pureLanguagePrompt}

Write a natural podcast-style conversation between ${speaker1Name} and ${speaker2Name} about '${input}'. 

Requirements:
- Use ONLY ${languageName} language throughout the entire script
- Make it engaging, humanlike, and alternate speakers every 1-3 lines
- Format each line as "Speaker Name: dialogue"
- Make it about 15-20 exchanges total
- Keep each speaker's lines conversational and not too long
- Use native ${languageName} expressions and vocabulary
- Make sure each speaker has a distinct personality${conversationalPrompt}`
        : `${pureLanguagePrompt}

Convert the following content into a two-speaker podcast script in ${languageName} language, assigning lines to ${speaker1Name} and ${speaker2Name}.

Requirements:
- Translate and convert everything to ${languageName} language ONLY
- The tone should be conversational, clear, and stay true to the content's meaning
- Format each line as "Speaker Name: dialogue"
- Make it dynamic with frequent speaker changes
- Use native ${languageName} expressions${conversationalPrompt}

Content to convert: ${input}

and dont give them too much information at once and podcast large and complex topics in a simple way and dont use ** in podcasts.`

    const response = await fetch("/api/script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) throw new Error("Failed to generate script")

    const data = await response.json()
    let enhancedScript = data.script

    // Add conversational elements in the target language
    if (settings.addFillers) {
      enhancedScript = addConversationalElements(enhancedScript)
    }

    setScript(enhancedScript)
    return enhancedScript
  }

  const addConversationalElements = (script: string): string => {
    const fillers = {
      "en-US": ["um", "uh", "you know", "like", "well", "so", "actually", "I mean"],
      "hi-IN": ["अरे", "हाँ", "तो", "यानी", "वैसे", "अच्छा", "ठीक है"],
      "mr-IN": ["अरे", "होय", "तर", "म्हणजे", "बरं", "ठीक आहे"],
      "gu-IN": ["અરે", "હા", "તો", "એટલે", "સારું", "ઠીક છે"],
      "ta-IN": ["அட", "ஆம்", "அப்போ", "அதாவது", "சரி", "ஓகே"],
      "te-IN": ["అరే", "అవును", "అప్పుడు", "అంటే", "సరే", "ఓకే"],
      "kn-IN": ["ಅರೆ", "ಹೌದು", "ಆಗ", "ಅಂದರೆ", "ಸರಿ", "ಓಕೆ"],
      "bn-IN": ["আরে", "হ্যাঁ", "তাহলে", "মানে", "ভালো", "ঠিক আছে"],
      "pa-IN": ["ਅਰੇ", "ਹਾਂ", "ਤਾਂ", "ਮਤਲਬ", "ਚੰਗਾ", "ਠੀਕ ਹੈ"],
      "es-ES": ["eh", "bueno", "pues", "o sea", "digamos", "claro"],
      "fr-FR": ["euh", "bon", "alors", "c'est-à-dire", "disons", "voilà"],
      "de-DE": ["äh", "also", "nun", "das heißt", "gut", "okay"],
      "it-IT": ["eh", "allora", "cioè", "diciamo", "bene", "ecco"],
      "pt-BR": ["né", "então", "tipo", "ou seja", "bom", "certo"],
      "ja-JP": ["えーと", "あの", "そう", "まあ", "はい"],
      "ko-KR": ["음", "그", "아", "네", "뭐"],
      "zh-CN": ["呃", "那个", "就是", "嗯", "对"],
      "ar-SA": ["يعني", "طيب", "إذن", "حسناً", "نعم"],
      "ru-RU": ["э", "ну", "то есть", "значит", "так"],
    }

    const langFillers = fillers[language as keyof typeof fillers] || fillers["en-US"]

    return script
      .split("\n")
      .map((line) => {
        if (line.includes(":") && Math.random() < 0.2) {
          const [speaker, ...dialogue] = line.split(":")
          const text = dialogue.join(":").trim()
          const filler = langFillers[Math.floor(Math.random() * langFillers.length)]
          return `${speaker}: ${filler}, ${text}`
        }
        return line
      })
      .join("\n")
  }

  const generateAudioFromScript = async (generatedScript: string) => {
    setCurrentStep("Recording high-quality audio...")
    setRecordingProgress(0)

    if (!audioProcessorRef.current) {
      throw new Error("Audio processor not initialized")
    }

    try {
      const lines = generatedScript.split("\n").filter((line: string) => line.trim())
      const audioSegments: Blob[] = []
      const totalLines = lines.length

      console.log(`Processing ${totalLines} lines of script`)

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const [speakerName, ...dialogue] = line.split(":")
        const text = dialogue.join(":").trim()

        if (text) {
          setCurrentStep(`Recording line ${i + 1} of ${totalLines}...`)
          setRecordingProgress(Math.round(((i + 1) / totalLines) * 70)) // 70% for recording

          const isFirstSpeaker = speakerName.trim() === speaker1Name
          const voice = isFirstSpeaker ? speaker1Voice : speaker2Voice
          const speakerSettings = isFirstSpeaker ? settings.speaker1 : settings.speaker2

          if (voice) {
            console.log(`Recording: ${speakerName} - ${text.substring(0, 50)}...`)

            // Create individual audio segment
            const audioBlob = await audioProcessorRef.current.createAudioSegment(text, voice, speakerSettings, language)

            if (audioBlob && audioBlob.size > 0) {
              console.log(`Audio segment created: ${audioBlob.size} bytes`)
              audioSegments.push(audioBlob)

              // Add pause between speakers
              const pauseBlob = await audioProcessorRef.current.createSilence(speakerSettings.pauseAfter)
              if (pauseBlob.size > 0) {
                audioSegments.push(pauseBlob)
              }
            } else {
              console.warn(`Failed to create audio for: ${text.substring(0, 50)}`)
            }
          }
        }
      }

      setCurrentStep("Combining audio segments...")
      setRecordingProgress(80)

      console.log(`Combining ${audioSegments.length} audio segments`)

      // Combine all audio segments
      const combinedAudio = await audioProcessorRef.current.combineAudioSegments(audioSegments)

      console.log(`Combined audio size: ${combinedAudio.size} bytes`)

      if (combinedAudio.size === 0) {
        throw new Error("Combined audio is empty")
      }

      setCurrentStep("Converting to MP3...")
      setRecordingProgress(90)

      // Convert to MP3
      const mp3Blob = await audioProcessorRef.current.convertToMP3(combinedAudio)

      console.log(`MP3 conversion complete: ${mp3Blob.size} bytes`)

      if (mp3Blob.size === 0) {
        throw new Error("MP3 conversion failed - empty file")
      }

      const url = URL.createObjectURL(mp3Blob)
      setAudioUrl(url)
      setAudioSize(mp3Blob.size)

      // Calculate duration
      const audio = new Audio(url)
      audio.addEventListener("loadedmetadata", () => {
        const minutes = Math.floor(audio.duration / 60)
        const seconds = Math.floor(audio.duration % 60)
        setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`)
        console.log(`Audio duration: ${minutes}:${seconds}`)
      })

      audio.addEventListener("error", (e) => {
        console.error("Audio loading error:", e)
        setDuration("Unknown")
      })

      setRecordingProgress(100)
      return url
    } catch (error) {
      console.error("Error generating audio:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setCurrentStep("")
    setRecordingProgress(0)
    setAudioSize(0)

    if (totalUsage > 19000) {
      toast({
        title: "Not enough credits",
        description: "You don't have enough credits to generate this podcast.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const generatedScript = await generateScript()
      await generateAudioFromScript(generatedScript)

      setTotalUsage((prev: number) => prev + 1000)

      const selectedLang = languages.find((l) => l.code === language)
      toast({
        title: "Podcast generated successfully!",
        description: `Your ${selectedLang?.nativeName} podcast is ready as MP3!`,
      })
    } catch (error) {
      console.error("Error generating podcast:", error)
      toast({
        title: "Error",
        description: "Failed to generate podcast. Please try again.",
        variant: "destructive",
      })
    }

    setLoading(false)
    setCurrentStep("")
    setRecordingProgress(0)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const downloadPodcast = () => {
    if (audioUrl) {
      const selectedLang = languages.find((l) => l.code === language)
      const link = document.createElement("a")
      link.href = audioUrl
      link.download = `${title || "podcast"}-${selectedLang?.name || "audio"}-${Date.now()}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download started!",
        description: `Downloading ${(audioSize / 1024 / 1024).toFixed(2)} MB MP3 file`,
      })
    }
  }

  const savePodcast = () => {
    const selectedLang = languages.find((l) => l.code === language)
    const podcastData = {
      title: title || `${mode === "topic" ? "Topic" : "Content"} Podcast`,
      script,
      audioUrl,
      duration,
      audioSize,
      speakers: {
        speaker1: { name: speaker1Name, voice: speaker1Voice?.name },
        speaker2: { name: speaker2Name, voice: speaker2Voice?.name },
      },
      language: selectedLang?.nativeName || language,
      mode,
      settings,
      createdAt: new Date().toISOString(),
    }

    const savedPodcasts = JSON.parse(localStorage.getItem("contentify-podcasts") || "[]")
    savedPodcasts.push(podcastData)
    localStorage.setItem("contentify-podcasts", JSON.stringify(savedPodcasts))

    toast({
      title: "Podcast saved!",
      description: `Your ${selectedLang?.nativeName} podcast has been saved locally.`,
    })
  }

  const currentLanguageVoices = availableVoices.filter((v) =>
    v.voice.lang.toLowerCase().includes(language.toLowerCase().split("-")[0]),
  )

  const selectedLanguage = languages.find((l) => l.code === language)

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-prim font-bold mb-3">🎙️ AI Podcast Generator</h1>
        <p className="text-lg text-muted-foreground mb-4">Create natural podcasts in your native language</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
            <Languages className="h-4 w-4" />
            {languages.length} Languages Supported
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
            <Users className="h-4 w-4" />
            {availableVoices.length} Voices Available
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
            <Globe className="h-4 w-4" />
            MP3 Output
          </Badge>
        </div>
      </div>

      {/* Language Showcase */}
      <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-6 w-6 text-blue-600" />
            Selected Language: {selectedLanguage?.flag} {selectedLanguage?.nativeName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Sample Text:</Label>
              <p className="text-lg font-medium mt-1">{selectedLanguage?.sampleText}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Available Voices:</Label>
              <p className="text-lg font-medium mt-1">{currentLanguageVoices.length} voices found</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MicIcon className="h-6 w-6 text-purple-600" />
                Podcast Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Podcast Title
                  </Label>
                  <Input
                    id="title"
                    placeholder={`Enter podcast title in ${selectedLanguage?.nativeName}...`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Language Selection - Prominent */}
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Choose Your Language
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="text-lg h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code} className="text-base py-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{lang.flag}</span>
                              <div>
                                <div className="font-medium">{lang.nativeName}</div>
                                <div className="text-sm text-muted-foreground">
                                  {lang.name} - {lang.region}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-green-600 mt-2">
                      Content will be generated purely in {selectedLanguage?.nativeName} language
                    </p>
                  </CardContent>
                </Card>

                {/* Mode Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Generation Mode</Label>
                  <RadioGroup value={mode} onValueChange={(value: "topic" | "content") => setMode(value)}>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="topic" id="topic" />
                      <Label htmlFor="topic" className="flex items-center gap-2 text-base">
                        <MessageSquare className="h-5 w-5" />
                        Topic to Podcast
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="content" id="content" />
                      <Label htmlFor="content" className="flex items-center gap-2 text-base">
                        <FileText className="h-5 w-5" />
                        Content to Podcast
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <Label htmlFor="input" className="text-base font-medium">
                    {mode === "topic" ? "Podcast Topic" : "Content to Convert"}
                  </Label>
                  <Textarea
                    id="input"
                    placeholder={
                      mode === "topic"
                        ? `Enter your topic in ${selectedLanguage?.nativeName}...`
                        : `Paste your content here (will be converted to ${selectedLanguage?.nativeName})...`
                    }
                    rows={mode === "topic" ? 4 : 8}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <Separator />

                {/* Speaker Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Speaker 1 */}
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-blue-700">🎤 Speaker 1</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Name</Label>
                        <Input
                          value={speaker1Name}
                          onChange={(e) => setSpeaker1Name(e.target.value)}
                          placeholder="Speaker 1 name"
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Voice & Accent</Label>
                        <Select
                          value={speaker1Voice?.name || ""}
                          onValueChange={(value) => {
                            const voice = availableVoices.find((v) => v.voice.name === value)?.voice
                            setSpeaker1Voice(voice || null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentLanguageVoices.map((voice) => (
                              <SelectItem key={voice.voice.name} value={voice.voice.name}>
                                <div className="flex items-center gap-2">
                                  <span>{voice.name}</span>
                                  <Badge
                                    variant={voice.gender === "Female" ? "secondary" : "outline"}
                                    className="text-xs"
                                  >
                                    {voice.gender}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {voice.quality}
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">{voice.accent}</div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full bg-white"
                          onClick={() => speaker1Voice && playVoiceDemo(speaker1Voice, settings.speaker1)}
                          disabled={!speaker1Voice}
                        >
                          <Volume2 className="h-4 w-4 mr-2" />
                          Play Voice Demo
                        </Button>
                      </div>

                      {/* Voice Settings */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-sm">Speech Rate: {settings.speaker1.rate.toFixed(2)}</Label>
                          <Slider
                            value={[settings.speaker1.rate]}
                            onValueChange={([value]) =>
                              setSettings((prev) => ({ ...prev, speaker1: { ...prev.speaker1, rate: value } }))
                            }
                            min={0.5}
                            max={1.5}
                            step={0.05}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Pitch: {settings.speaker1.pitch.toFixed(2)}</Label>
                          <Slider
                            value={[settings.speaker1.pitch]}
                            onValueChange={([value]) =>
                              setSettings((prev) => ({ ...prev, speaker1: { ...prev.speaker1, pitch: value } }))
                            }
                            min={0.7}
                            max={1.3}
                            step={0.05}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Speaker 2 */}
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-green-700">🎤 Speaker 2</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Name</Label>
                        <Input
                          value={speaker2Name}
                          onChange={(e) => setSpeaker2Name(e.target.value)}
                          placeholder="Speaker 2 name"
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Voice & Accent</Label>
                        <Select
                          value={speaker2Voice?.name || ""}
                          onValueChange={(value) => {
                            const voice = availableVoices.find((v) => v.voice.name === value)?.voice
                            setSpeaker2Voice(voice || null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentLanguageVoices.map((voice) => (
                              <SelectItem key={voice.voice.name} value={voice.voice.name}>
                                <div className="flex items-center gap-2">
                                  <span>{voice.name}</span>
                                  <Badge
                                    variant={voice.gender === "Female" ? "secondary" : "outline"}
                                    className="text-xs"
                                  >
                                    {voice.gender}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {voice.quality}
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">{voice.accent}</div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full bg-white"
                          onClick={() => speaker2Voice && playVoiceDemo(speaker2Voice, settings.speaker2)}
                          disabled={!speaker2Voice}
                        >
                          <Volume2 className="h-4 w-4 mr-2" />
                          Play Voice Demo
                        </Button>
                      </div>

                      {/* Voice Settings */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-sm">Speech Rate: {settings.speaker2.rate.toFixed(2)}</Label>
                          <Slider
                            value={[settings.speaker2.rate]}
                            onValueChange={([value]) =>
                              setSettings((prev) => ({ ...prev, speaker2: { ...prev.speaker2, rate: value } }))
                            }
                            min={0.5}
                            max={1.5}
                            step={0.05}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Pitch: {settings.speaker2.pitch.toFixed(2)}</Label>
                          <Slider
                            value={[settings.speaker2.pitch]}
                            onValueChange={([value]) =>
                              setSettings((prev) => ({ ...prev, speaker2: { ...prev.speaker2, pitch: value } }))
                            }
                            min={0.7}
                            max={1.3}
                            step={0.05}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Advanced Settings */}
                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
                      <Settings className="h-5 w-5" />
                      Audio Enhancement Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="addFillers"
                          checked={settings.addFillers}
                          onChange={(e) => setSettings((prev) => ({ ...prev, addFillers: e.target.checked }))}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="addFillers" className="text-base">
                          Add Natural Fillers
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="naturalPauses"
                          checked={settings.naturalPauses}
                          onChange={(e) => setSettings((prev) => ({ ...prev, naturalPauses: e.target.checked }))}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="naturalPauses" className="text-base">
                          Natural Sentence Pauses
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="conversationalTone"
                          checked={settings.conversationalTone}
                          onChange={(e) => setSettings((prev) => ({ ...prev, conversationalTone: e.target.checked }))}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="conversationalTone" className="text-base">
                          Conversational Style
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-14 text-lg font-semibold"
                  disabled={loading || !input.trim() || !speaker1Voice || !speaker2Voice}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                      {currentStep || "Generating Podcast..."}
                      {recordingProgress > 0 && ` (${recordingProgress}%)`}
                    </>
                  ) : (
                    <>🎙️ Generate {selectedLanguage?.nativeName} Podcast</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          {/* Audio Player */}
          <Card className="border-2 border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="text-xl">🎧 Generated Podcast</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {audioUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                    <div>
                      <h3 className="font-semibold text-lg">{title || "Untitled Podcast"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {speaker1Name} & {speaker2Name} • {duration}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {selectedLanguage?.flag} {selectedLanguage?.nativeName}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          MP3 Format
                        </Badge>
                        {audioSize > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {(audioSize / 1024 / 1024).toFixed(2)} MB
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="lg" onClick={togglePlayPause}>
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                  </div>

                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    controls
                    className="w-full h-12"
                  />

                  <div className="flex gap-3">
                    <Button onClick={downloadPodcast} className="flex-1 h-12 text-base font-semibold">
                      <Download className="h-5 w-5 mr-2" />
                      Download MP3
                    </Button>
                    <Button
                      onClick={savePodcast}
                      variant="outline"
                      className="flex-1 h-12 text-base font-semibold bg-transparent"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Local
                    </Button>
                  </div>

                  {audioSize > 0 && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Audio file ready: {(audioSize / 1024 / 1024).toFixed(2)} MB
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MicIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">
                    Configure your podcast settings and click generate
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pure {selectedLanguage?.nativeName} content with MP3 output!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recording Progress */}
          {loading && recordingProgress > 0 && (
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Recording Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span>{currentStep}</span>
                    <span className="font-semibold">{recordingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${recordingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Script Preview */}
          {script && (
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                <CardTitle className="text-lg">📝 Generated Script</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="max-h-96 overflow-y-auto space-y-3 text-base">
                  {script.split("\n").map((line, index) => {
                    if (line.trim()) {
                      const [speaker, ...dialogue] = line.split(":")
                      const isSpeaker1 = speaker.trim() === speaker1Name
                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-l-4 ${
                            isSpeaker1 ? "bg-blue-50 border-l-blue-500" : "bg-green-50 border-l-green-500"
                          }`}
                        >
                          <span
                            className={`font-semibold text-base ${isSpeaker1 ? "text-blue-700" : "text-green-700"}`}
                          >
                            {speaker}:
                          </span>
                          <span className="ml-2 text-base">{dialogue.join(":")}</span>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
