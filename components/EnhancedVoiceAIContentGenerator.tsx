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

import { useState, useRef, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Editor } from "@toast-ui/react-editor"
import "@toast-ui/editor/dist/toastui-editor.css" // Import editor styles
import {
  Mic,
  MicOff,
  Edit2,
  Save,
  Copy,
  Wand2,
  Sparkles,
  Volume2,
  Settings,
  ChevronDown,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { toast } from "react-hot-toast"
import { enhancePrompt, generateContent } from "@/utils/Gpt-4o"
import { VoiceProcessor } from "@/utils/voice-processing"
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext"
import { UpdateContext } from "@/app/(context)/UpdateContext"
import { useUser } from "@clerk/nextjs"
import { db } from "@/utils/db"
// import { voiceGen } from "@/utils/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

// Modern color theme with teal and purple gradients
const THEME = {
  primary: {
    gradient: "from-teal-500 to-purple-600",
    hover: "from-teal-600 to-purple-700",
    text: "text-white",
    border: "border-teal-500",
    bg: "bg-teal-500",
  },
  secondary: {
    gradient: "from-slate-800 to-slate-900",
    hover: "from-slate-900 to-black",
    text: "text-white",
    border: "border-slate-700",
    bg: "bg-slate-800",
  },
  accent: {
    gradient: "from-purple-500 to-pink-500",
    hover: "from-purple-600 to-pink-600",
    text: "text-white",
    border: "border-purple-500",
    bg: "bg-purple-500",
  },
  neutral: {
    gradient: "from-slate-100 to-slate-200",
    hover: "from-slate-200 to-slate-300",
    text: "text-slate-800",
    border: "border-slate-300",
    bg: "bg-slate-100",
  },
} as const

const tones = [
  { value: "neutral", label: "Neutral" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "professional", label: "Professional" },
]

const outputLengths = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
]

function EnhancedVoiceAIContentGenerator() {
  const [isListening, setIsListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiOutput, setAiOutput] = useState("")
  const [tone, setTone] = useState("neutral")
  const [outputLength, setOutputLength] = useState("medium")
  const [activeTab, setActiveTab] = useState("input")
  const [sensitivity, setSensitivity] = useState(75)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [editorHeight, setEditorHeight] = useState(450)
  const [editorMounted, setEditorMounted] = useState(false)

  const editorRef = useRef<any>(null)
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const voiceProcessorRef = useRef<VoiceProcessor | null>(null)
  const animationFrameRef = useRef<number>()

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const { user } = useUser()

  // 33
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"
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

  // Mark editor as mounted for client-side rendering
  useEffect(() => {
    setEditorMounted(true)
  }, [])

  // Update editor content when AI output changes
  useEffect(() => {
    if (editorRef.current && aiOutput) {
      editorRef.current.getInstance().setMarkdown(aiOutput)
    }
  }, [aiOutput, editorMounted])

  // Handle editor resize when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (editorContainerRef.current && !isEditorFullscreen) {
        const containerHeight = window.innerHeight * 0.5
        setEditorHeight(Math.max(450, containerHeight))
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isEditorFullscreen])

  // Handle fullscreen mode for editor
  useEffect(() => {
    if (isEditorFullscreen) {
      setEditorHeight(window.innerHeight - 200)
    } else {
      const containerHeight = window.innerHeight * 0.5
      setEditorHeight(Math.max(450, containerHeight))
    }
  }, [isEditorFullscreen])

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
            autoGainControl: true,
          },
        })

        await voiceProcessorRef.current?.initialize(stream, sensitivity)
        updateAudioLevel()

        recognitionRef.current.start()
        setIsListening(true)

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ""
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " "
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript((prev) => prev + finalTranscript)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          toast.error("Error in speech recognition. Please try again.")
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
          stream.getTracks().forEach((track) => track.stop())
          if (voiceProcessorRef.current) {
            voiceProcessorRef.current.cleanup()
          }
        }
      } catch (error) {
        console.error("Error accessing microphone:", error)
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
      setActiveTab("output")
    } catch (error) {
      console.error("Error in processing prompt:", error)
      toast.error("Failed to process prompt. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateAIContent = async (prompt: string) => {
    const creditsNeeded = 0
    if (totalUsage + creditsNeeded > 20000) {
      toast.error("Not enough credits to generate content")
      return
    }

    try {
      const content = await generateContent(prompt, tone, outputLength)
      setAiOutput(content)
      setTotalUsage((prev: number) => prev + creditsNeeded)
      setupdatecredit?.(Date.now())
      toast.success("Content generated successfully!")
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate content. Please try again.")
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

  const copyToClipboard = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown()
      navigator.clipboard
        .writeText(content)
        .then(() => toast.success("Content copied to clipboard!"))
        .catch(() => toast.error("Failed to copy content"))
    }
  }

  const saveContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown()
      const blob = new Blob([content], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ai-content-${new Date().toISOString().slice(0, 10)}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("Content saved as markdown file!")
    }
  }

  const toggleFullscreen = () => {
    setIsEditorFullscreen(!isEditorFullscreen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <Card
        className={`max-w-6xl mx-auto border-0 shadow-xl overflow-hidden transition-all duration-300 ${
          isEditorFullscreen ? "fixed inset-0 z-50 max-w-none rounded-none" : ""
        }`}
      >
        <CardHeader className="p-6 bg-white border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-black flex items-center">
                <Sparkles className="mr-2 h-6 w-6 text-acc" />
                Voice AI
              </CardTitle>
              <CardDescription className="text-black/80 mt-1">
                Transform your voice into enhanced content with advanced AI
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-slate-400 bg-white hover:bg-slate-100 text-acc"
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {isEditorFullscreen && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-slate-200 bg-white hover:bg-slate-100 text-prim"
                        onClick={toggleFullscreen}
                      >
                        <Minimize2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Exit Fullscreen</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </CardHeader>

        <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <CollapsibleContent>
            <div className="bg-white text-black p-4 space-y-4 border-b">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Content Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-full border border-slate-200 bg-white hover:border-prim transition-colors text-black">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value} className="text-black hover:bg-slate-100">
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Output Length</label>
                  <Select value={outputLength} onValueChange={setOutputLength}>
                    <SelectTrigger className="w-full border border-slate-200 bg-white hover:border-prim transition-colors text-black">
                      <SelectValue placeholder="Select output length" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      {outputLengths.map((len) => (
                        <SelectItem key={len.value} value={len.value} className="text-black hover:bg-slate-100">
                          {len.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-black">Microphone Sensitivity: {sensitivity}%</label>
                  <div className="flex items-center space-x-2">
                  </div>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[sensitivity]}
                  onValueChange={handleSensitivityChange}
                  className="[&>span:first-child]:bg-slate-200 [&>span:nth-child(2)]:bg-transparent"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <CardContent className={`p-6 ${isEditorFullscreen ? "h-[calc(100vh-180px)]" : ""}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100 rounded-lg">
              <TabsTrigger
                value="input"
                className="data-[state=active]:bg-prim data-[state=active]:text-white"
              >
                Voice Input
              </TabsTrigger>
              <TabsTrigger
                value="output"
                className="data-[state=active]:bg-prim data-[state=active]:text-white"
              >
                AI Output
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
                              ? "bg-red-500 hover:bg-red-600"
                              : `bg-prim hover:bg-prim/80 ${THEME.primary.gradient} ${THEME.primary.hover}`
                          } text-white transition-all duration-300`}
                          disabled={loading}
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to start/stop voice recording</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="relative">
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Your input will appear here. You can also type directly..."
                    className="min-h-[200px] border-2 border-slate-200 focus:border-transparent focus:ring-second rounded-lg"
                  />

                  <div className="absolute bottom-4 right-4">
                    <Button
                      onClick={handleConfirmPrompt}
                      className={`bg-prim hover:bg-prim/80 text-white transition-all duration-300`}
                      disabled={loading || !transcript.trim()}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="output" className="space-y-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium">Generated Content</h3>
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-teal-500" />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-slate-200">
                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleEdit} disabled={loading || !aiOutput}>
                        <Edit2 className="mr-2 h-4 w-4" /> Edit Content
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={copyToClipboard} disabled={!aiOutput}>
                        <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={saveContent} disabled={!aiOutput}>
                        <Save className="mr-2 h-4 w-4" /> Save as File
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="border-slate-200" onClick={toggleFullscreen}>
                          {isEditorFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isEditorFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Scrollable Editor Container */}
              <ScrollArea
                className={`border-2 rounded-lg bg-white border-slate-200 transition-all duration-300 ${
                  isEditorFullscreen ? "h-[calc(100vh-280px)]" : `h-[${editorHeight}px]`
                }`}
                ref={editorContainerRef}
              >
                <div className="min-h-full">
                  {editorMounted && (
                    <Editor
                      ref={editorRef}
                      initialValue={aiOutput || "Your Result Will Appear Here!"}
                      height={isEditorFullscreen ? "calc(100vh - 280px)" : `${editorHeight}px`}
                      initialEditType="wysiwyg"
                      previewStyle="vertical"
                      useCommandShortcut={true}
                      toolbarItems={[
                        ["heading", "bold", "italic", "strike"],
                        ["hr", "quote"],
                        ["ul", "ol", "task", "indent", "outdent"],
                        ["table", "image", "link"],
                        ["code", "codeblock"],
                      ]}
                    />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter
          className={`bg-slate-50 border-t border-slate-200 p-4 ${
            isEditorFullscreen ? "fixed bottom-0 left-0 right-0 z-50" : ""
          }`}
        >
          <div className="w-full flex justify-between items-center">

            <div className="flex items-center space-x-2">
              {activeTab === "output" && aiOutput && (
                <>
                  <Button variant="outline" size="sm" className="border-slate-200" onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    className={`bg-gradient-to-r ${THEME.primary.gradient} hover:${THEME.primary.hover} text-white`}
                    onClick={saveContent}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EnhancedVoiceAIContentGenerator

