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
import { ImageIcon, Loader2Icon, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
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
]

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("")
  const [imageCount, setImageCount] = useState(4)
  const [enhancedPrompts, setEnhancedPrompts] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl text-prim font-bold text-center mb-8">AI Image Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form (Left Side) */}
        <Card className="p-4 border-second">
          <CardContent className="p-0 pt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-lg font-medium">
                  What would you like to create?
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the image you want to generate in detail..."
                  rows={5}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
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
                <p className="text-sm text-muted-foreground">Choose "Mystery" for a random style</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageCount" className="text-lg font-medium">
                  Number of Images
                </Label>
                <Input
                  id="imageCount"
                  type="number"
                  min={1}
                  max={4}
                  value={imageCount}
                  onChange={(e) => setImageCount(Math.min(4, Math.max(1, Number.parseInt(e.target.value) || 1)))}
                />
                <p className="text-sm text-muted-foreground">Generate up to 4 variations</p>
              </div>

              <Button type="submit" className="w-full text-white bg-prim" disabled={loading || !prompt.trim()}>
                {loading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Generating Images...
                  </>
                ) : (
                  "Generate Images"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Output Display (Right Side) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Images</h2>

          {loading ? (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
              <div className="text-center">
                <Loader2Icon className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Creating your images...</p>
              </div>
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Generated image ${index + 1}`}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => window.open(image, "_blank")}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
              <div className="text-center">
                <Image
          priorityIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Enter a prompt and generate images</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
