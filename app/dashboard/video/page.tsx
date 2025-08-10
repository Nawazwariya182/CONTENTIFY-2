/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name "Contentify" — is strictly prohibited.
  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/

"use client"

import type React from "react"
import { useState, useContext } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { VideoIcon, Loader2Icon, Download, Play, Pause } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext"
import { generateEnhancedVideoPrompt } from "@/utils/video/videogen"

const videoModels = [
  "Wan-AI/Wan2.1-T2V-14B",
  "Wan-AI/Wan2.1-T2V-1.3B",
]

const videoStyles = [
  "Cinematic",
  "Documentary",
  "Animation",
  "Realistic",
  "Artistic",
  "Vintage",
  "Modern",
  "Futuristic",
  "Slow Motion",
  "Time Lapse",
  "Mystery",
]

const videoDurations = [
  { label: "Very Short (4 f)", value: 4 },
  { label: "Short (5 f)", value: 5 },
  { label: "Medium (8 f)", value: 8 },
  { label: "Long (12 f)", value: 12 },
  { label: "Max (16 f)", value: 16 },
]

interface GeneratedVideo {
  url: string
  blob: Blob
  prompt: string
}

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("")
  const [model, setModel] = useState(videoModels[0])
  const [duration, setDuration] = useState(5)
  const [enhancedPrompt, setEnhancedPrompt] = useState("")
  const [video, setVideo] = useState<GeneratedVideo | null>(null)
  const [loading, setLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const { toast } = useToast()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)

  const CLIENT_TIMEOUT_MS = 55000 // a bit less than server default 60000 to catch it client-side

  async function generateVideoOnce(enhanced: string, chosenModel: string, frames: number, attemptNumber: number) {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS)

    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: enhanced, model: chosenModel, duration: frames }),
        signal: controller.signal,
      })

      if (!response.ok) {
        // Try to parse JSON error
        let reason = ""
        try {
          const j = await response.json()
          reason = j?.error || ""
        } catch {
          /* ignore */
        }
        const message = reason || `Request failed (${response.status})`
        throw new Error(message)
      }

      const blob = await response.blob()
      const videoUrl = URL.createObjectURL(blob)
      setVideo({ url: videoUrl, blob, prompt: enhanced })
      setTotalUsage((prevUsage: number) => prevUsage + 1500)
      toast({ title: "Video generated successfully", description: `Attempt ${attemptNumber} succeeded.` })
      setErrorMsg(null)
    } finally {
      clearTimeout(t)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setVideo(null)
    setErrorMsg(null)
    setAttempt(0)

    if (totalUsage > 15000) {
      toast({
        title: "Not enough credits",
        description: "You don't have enough credits to generate this video.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const selectedStyle =
        style === "Mystery" ? videoStyles[Math.floor(Math.random() * (videoStyles.length - 1))] : style
      const enhanced = await generateEnhancedVideoPrompt(prompt, selectedStyle, duration)
      setEnhancedPrompt(enhanced)

      // First attempt
      setAttempt(1)
      try {
        await generateVideoOnce(enhanced, model, duration, 1)
      } catch (err: any) {
        const msg = String(err?.message || err)
        // Decide retry criteria
        const timeoutLike =
          msg.includes("aborted") ||
          msg.includes("Timeout") ||
            msg.includes("504") ||
            msg.toLowerCase().includes("exceeded")
        if (!timeoutLike) throw err

        // Retry with lighter settings once
        setAttempt(2)
        toast({
          title: "Retrying with lighter settings",
          description: "Initial attempt timed out. Switching to lighter model & fewer frames.",
        })
        const fallbackModel = videoModels[1] // smaller
        const fallbackFrames = Math.min( Math.max(4, Math.round(duration / 2)), 8)
        await generateVideoOnce(enhanced, fallbackModel, fallbackFrames, 2)
      }
    } catch (error: any) {
      console.error("Error generating video:", error)
      setErrorMsg(
        `Generation failed${attempt ? ` on attempt ${attempt}` : ""}: ${error?.message || "Unknown error"}.
Suggestions:
- Reduce frames/duration
- Use the smaller model
- Simplify the prompt
- Try again later (model may be busy)`
      )
      toast({
        title: "Error",
        description: "Video generation failed. See details above.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  const handleDownload = () => {
    if (video) {
      const link = document.createElement("a")
      link.href = video.url
      link.download = `generated-video-${Date.now()}.mp4`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const togglePlayPause = () => {
    const videoElement = document.getElementById("generated-video") as HTMLVideoElement
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause()
      } else {
        videoElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl text-prim font-bold text-center mb-8">AI Video Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form (Left Side) */}
        <Card className="p-4 border-second">
          <CardContent className="p-0 pt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-lg font-medium">
                  Describe your video
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the video you want to generate in detail... (e.g., 'A young man walking on a busy street at sunset')"
                  rows={5}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style" className="text-lg font-medium">
                  Video Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoStyles.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Choose "Mystery" for a random style</p>
              </div>

              {/* UNCOMMENTED: Model selector */}
              <div className="space-y-2">
                <Label htmlFor="model" className="text-lg font-medium">
                  AI Model
                </Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoModels.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m.split("/")[1] || m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Smaller model is faster and helps avoid timeouts.</p>
              </div>

              {/* UNCOMMENTED: Duration / frames selector */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-lg font-medium">
                  Frames (approx duration)
                </Label>
                <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoDurations.map((d) => (
                      <SelectItem key={d.value} value={d.value.toString()}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Fewer frames = faster generation.</p>
              </div>

              <Button type="submit" className="w-full text-white bg-prim" disabled={loading || !prompt.trim()}>
                {loading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  "Generate Video"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Output Display (Right Side) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Video</h2>

          {loading ? (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
              <div className="text-center">
                <Loader2Icon className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Creating your video...</p>
                <p className="text-sm text-muted-foreground mt-2">This may take 1-3 minutes</p>
              </div>
            </div>
          ) : video ? (
            <div className="space-y-4">
              <div className="relative group overflow-hidden rounded-lg border">
                <video
                  id="generated-video"
                  src={video.url}
                  className="w-full aspect-video object-cover"
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              {/* {enhancedPrompt && (
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Enhanced Prompt:</h3>
                  <p className="text-sm text-muted-foreground">{enhancedPrompt}</p>
                </div>
              )} */}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
              <div className="text-center">
                <VideoIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Enter a prompt and generate a video</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 border border-destructive/40 bg-destructive/10 rounded text-sm whitespace-pre-line">
              {errorMsg}
              {attempt === 2 && !video && (
                <div className="mt-2">
                  Retry suggestions exhausted. Try again with fewer frames or simpler prompt.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
