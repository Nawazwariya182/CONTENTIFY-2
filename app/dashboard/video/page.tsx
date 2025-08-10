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

// const videoDurations = [
//   { label: "3 seconds", value: 3 },
//   { label: "5 seconds", value: 5 },
//   { label: "10 seconds", value: 10 },
//   { label: "15 seconds", value: 15 },
// ]

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
  const { toast } = useToast()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setVideo(null)

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

      const response = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhanced,
          model,
          duration,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate video")
      }

      const blob = await response.blob()
      const videoUrl = URL.createObjectURL(blob)

      setVideo({
        url: videoUrl,
        blob,
        prompt: enhanced,
      })

      setTotalUsage((prevUsage: number) => prevUsage + 1500)

      toast({
        title: "Video generated successfully",
        description: "Your video has been generated and is ready to view.",
      })
    } catch (error) {
      console.error("Error generating video:", error)
      toast({
        title: "Error",
        description: "An error occurred while generating the video.",
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

              {/* <div className="space-y-2">
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
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="duration" className="text-lg font-medium">
                  Video Duration
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
              </div> */}

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
        </div>
      </div>
    </div>
  )
}
