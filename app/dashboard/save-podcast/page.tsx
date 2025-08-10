/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Trash2, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SavedPodcast {
  title: string
  script: string
  audioUrl: string
  duration: string
  speakers: {
    speaker1: { name: string; voice: string }
    speaker2: { name: string; voice: string }
  }
  language: string
  mode: string
  createdAt: string
}

export default function SavedPodcasts() {
  const [savedPodcasts, setSavedPodcasts] = useState<SavedPodcast[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const podcasts = JSON.parse(localStorage.getItem("contentify-podcasts") || "[]")
    setSavedPodcasts(podcasts)
  }, [])

  const deletePodcast = (index: number) => {
    const updatedPodcasts = savedPodcasts.filter((_, i) => i !== index)
    setSavedPodcasts(updatedPodcasts)
    localStorage.setItem("contentify-podcasts", JSON.stringify(updatedPodcasts))

    toast({
      title: "Podcast deleted",
      description: "The podcast has been removed from your saved list.",
    })
  }

  const downloadPodcast = (podcast: SavedPodcast, index: number) => {
    const link = document.createElement("a")
    link.href = podcast.audioUrl
    link.download = `${podcast.title}-${index}.wav`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Saved Podcasts</h1>

      {savedPodcasts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No saved podcasts yet. Create your first podcast!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPodcasts.map((podcast, index) => (
            <Card key={index} className="border-second">
              <CardHeader>
                <CardTitle className="text-lg">{podcast.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(podcast.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <p>
                    <strong>Speakers:</strong> {podcast.speakers.speaker1.name} & {podcast.speakers.speaker2.name}
                  </p>
                  <p>
                    <strong>Duration:</strong> {podcast.duration}
                  </p>
                  <p>
                    <strong>Language:</strong> {podcast.language}
                  </p>
                  <p>
                    <strong>Mode:</strong> {podcast.mode === "topic" ? "Topic" : "Content"}
                  </p>
                </div>

                <audio controls className="w-full" src={podcast.audioUrl} />

                <div className="flex gap-2">
                  <Button onClick={() => downloadPodcast(podcast, index)} className="flex-1" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={() => deletePodcast(index)} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
