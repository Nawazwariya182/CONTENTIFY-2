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

import type React from "react"

import { useState, useContext } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ImageIcon, Loader2Icon, Download, Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext"
import { generateAlternativePrompts } from "@/utils/images/generateEnhancedPrompts"

const styles = [
  "Cinematic",
  "Art",
  "Anime",
  "Photorealistic",
  "Abstract",
  "Cartoon",
  "Mystery",
  "Minimalistic",
  "Vintage",
  "Surreal",
  "Modern",
  "Ghibli",
  "Studio Ghibli",
  "Futuristic",
  "Cyberpunk",
  "Steampunk",
  "Watercolor",
  "Impressionistic",
  "Pop Art",
  "Realistic Art"
]

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("")
  const [imageCount, setImageCount] = useState(4)
  const [enhancedPrompts, setEnhancedPrompts] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPrompts, setShowPrompts] = useState(false)
  const { toast } = useToast()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Clear previous images when generating new ones
    setImages([])

    if (totalUsage  > 20000) {
      toast({
        title: "Not enough credits",
        description: "You don't have enough credits to generate these images.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const selectedStyle = style === "Mystery" ? styles[Math.floor(Math.random() * (styles.length - 1))] : style
      const generatedPrompts = await generateAlternativePrompts(prompt, selectedStyle, imageCount)
      setEnhancedPrompts(generatedPrompts)

      const generatedImages = generatedPrompts.map(
        (enhancedPrompt) => `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}`,
      )

      if (generatedImages.length > 0) {
        setImages(generatedImages)
        setTotalUsage((prevUsage: number) => prevUsage + imageCount * 300)
        toast({
          title: "Images generated successfully",
          description: `${generatedImages.length} image(s) have been generated.`,
        })
      } else {
        toast({
          title: "Generation failed",
          description: "Failed to generate images. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating images:", error)
      toast({
        title: "Error",
        description: "An error occurred while generating images.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  const handleCopy = () => {
    if (!prompt) return
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const downloadAll = () => {
    images.forEach((url, i) => {
      const a = document.createElement("a")
      a.href = url
      a.download = `image-${i + 1}.png`
      a.click()
    })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
        <span className="bg-gradient-to-r from-prim via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
          AI Image Generator
        </span>
      </h1>

      {/* Credit Usage
      <div className="mb-8 flex flex-col gap-2 max-w-xl mx-auto">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Credits Used</span>
          <span>{totalUsage} / 20000</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-prim via-fuchsia-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${Math.min(100, (totalUsage / 20000) * 100)}%` }}
          />
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Input Form (Left Side) */}
        <Card className="p-5 border border-border/60 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <CardContent className="p-0 space-y-7">
            {/* Prompt */}
            <form className="space-y-7" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-lg font-medium">
                  What would you like to create?
                </Label>
                <div className="relative">
                  <Textarea
                    id="prompt"
                    placeholder="Describe the image you want to generate in detail..."
                    rows={5}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="resize-none bg-background/60 backdrop-blur border-border focus:ring-2 focus:ring-prim/40 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-md border bg-background/70 px-2 py-1 text-xs font-medium hover:bg-accent transition"
                    aria-label="Copy prompt"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Style Select + Chips */}
              <div className="space-y-3">
                <Label htmlFor="style" className="text-lg font-medium">
                  Art Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <div className="grid gap-2">
                  <div className="flex overflow-x-auto gap-2 py-1 scrollbar-thin">
                    {styles.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition
                          ${style === s
                            ? "bg-gradient-to-r from-prim to-fuchsia-500 text-white border-transparent shadow"
                            : "bg-background/60 hover:bg-accent"}
                        `}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div> */}
                <p className="text-xs text-muted-foreground">You can also pick via dropdown. "Mystery" = random style.</p>
              </div>

              {/* Image Count */}
              <div className="space-y-2">
                <Label htmlFor="imageCount" className="text-lg font-medium">
                  Number of Images
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setImageCount(n)}
                      className={`flex-1 rounded-md border px-0 py-2 text-sm font-medium transition
                        ${imageCount === n
                          ? "bg-gradient-to-r from-prim via-fuchsia-500 to-indigo-500 text-white border-transparent shadow"
                          : "bg-background/60 hover:bg-accent"}`}
                      aria-pressed={imageCount === n}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Generate up to 4 variations</p>
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-prim via-fuchsia-500 to-indigo-600 hover:opacity-90 shadow-lg shadow-prim/20 disabled:opacity-60"
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Generating Images...
                  </>
                ) : (
                  "Generate Images"
                )}
              </Button>

              {/* Enhanced Prompts Toggle */}
              {enhancedPrompts.length > 0 && (
                <div className="rounded-lg border bg-background/60 backdrop-blur p-3">
                  <button
                    type="button"
                    onClick={() => setShowPrompts((p) => !p)}
                    className="w-full flex items-center justify-between text-sm font-medium"
                  >
                    <span>Enhanced Prompts ({enhancedPrompts.length})</span>
                    <span className="text-xs text-muted-foreground">{showPrompts ? "Hide" : "Show"}</span>
                  </button>
                  {showPrompts && (
                    <ul className="mt-3 space-y-2 max-h-40 overflow-auto pr-1 text-xs">
                      {enhancedPrompts.map((pmt, i) => (
                        <li
                          key={i}
                          className="rounded-md border bg-background/70 px-2 py-1 leading-relaxed hover:bg-accent/60 transition"
                        >
                          {pmt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Output Display (Right Side) */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Generated Images</h2>
            {/* {images.length > 0 && (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={downloadAll}
                  className="hover:bg-accent/70"
                >
                  <Download className="h-4 w-4 mr-1" /> All
                </Button>
              </div>
            )} */}
          </div>

          {/* Loading skeleton grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(imageCount)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border bg-gradient-to-br from-muted/40 to-muted/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.05),rgba(255,255,255,0.15),rgba(255,255,255,0.05))] bg-[length:200%_100%]" />
                </div>
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border bg-background/60 backdrop-blur transition hover:shadow-lg"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Generated image ${index + 1}`}
                    className="w-full aspect-square object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition">
                    <div className="p-2 flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => window.open(image, "_blank")}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                      <span className="ml-auto text-[10px] px-2 py-1 rounded bg-black/40 text-white/70">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center h-[420px] rounded-xl border border-dashed bg-background/40 backdrop-blur text-center">
              <ImageIcon className="h-14 w-14 text-muted-foreground/60 mb-4" />
              <p className="text-sm text-muted-foreground max-w-xs">
                Describe something vivid and choose a style to begin creating stunning visuals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
