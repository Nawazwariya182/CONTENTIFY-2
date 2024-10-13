'use client'

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, Play, Pause, Download, FileVideo } from "lucide-react"
import { toast } from 'react-hot-toast'

const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || ''
const AIXPLAIN_MODEL_ID = '653684e161ddee7e38347e7b'

export default function AudioExtractor() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.size <= 50 * 1024 * 1024) {
      setFile(selectedFile)
      toast.success('Video file selected')
    } else {
      toast.error('Please select a video file under 50MB')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setProgress(0)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const videoData = e.target?.result as string
      await extractAudio(videoData)
    }
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress((e.loaded / e.total) * 45) // Set progress to 45% max during upload
      }
    }
    reader.readAsDataURL(file)
  }

  const extractAudio = async (videoData: string) => {
    setIsUploading(false)
    setIsExtracting(true)
    setProgress(45) // Start extraction progress at 45%

    try {
      const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_MODEL_ID}`, {
        method: 'POST',
        body: JSON.stringify({ data: videoData }),
        headers: {
          'x-api-key': AIXPLAIN_API_KEY,
          'content-type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to initiate audio extraction: ${errorData.message || response.statusText}`)
      }

      const results = await response.json()
      const urlToPoll = results.data

      await pollForResults(urlToPoll)
    } catch (error) {
      console.error('Error extracting audio:', error)
      toast.error(`Failed to extract audio: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsExtracting(false)
      setProgress(0)
    }
  }

  const pollForResults = (urlToPoll: string) => {
    return new Promise<void>((resolve, reject) => {
      let attempts = 0
      const maxAttempts = 60 // 5 minutes max (60 * 5 seconds)
      const pollInterval = setInterval(async () => {
        attempts++
        try {
          const statusResponse = await fetch(urlToPoll, {
            method: 'GET',
            headers: {
              'x-api-key': AIXPLAIN_API_KEY,
              'content-type': 'application/json'
            }
          })

          if (!statusResponse.ok) {
            throw new Error(`Failed to get extraction status: ${statusResponse.statusText}`)
          }

          const results = await statusResponse.json()
          const extractionProgress = Math.min(90, 45 + (results.progress || 0) * 0.45) // Map 0-100% to 45-90%
          setProgress(extractionProgress)

          if (results.completed) {
            clearInterval(pollInterval)
            setProgress(100)
            setAudioUrl(results.data)
            setIsExtracting(false)
            toast.success('Audio extracted successfully!')
            resolve()
          }

          if (attempts >= maxAttempts) {
            clearInterval(pollInterval)
            throw new Error('Extraction timed out')
          }
        } catch (error) {
          clearInterval(pollInterval)
          console.error('Error polling for results:', error)
          toast.error(`Failed to get extraction results: ${error instanceof Error ? error.message : 'Unknown error'}`)
          setIsExtracting(false)
          setProgress(0)
          reject(error)
        }
      }, 5000)
    })
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

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a')
      link.href = audioUrl
      link.download = 'extracted_audio.mp3'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Audio Extractor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileVideo className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">MP4, WebM, OGG, MOV, AVI, MKV, FLV (MAX. 50MB)</p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              accept="video/mp4, video/webm, video/ogg, video/mov, video/avi, video/mkv, video/flv"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </label>
        </div>
        {file && (
          <p className="text-sm text-gray-500 text-center">
            Selected file: {file.name}
          </p>
        )}
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading || isExtracting}
          className="w-full"
        >
          {isUploading || isExtracting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {isUploading ? 'Uploading...' : isExtracting ? 'Extracting...' : 'Extract Audio'}
        </Button>
        {(isUploading || isExtracting) && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500 text-center">{progress.toFixed(0)}% Complete</p>
          </div>
        )}
        {audioUrl && (
          <div className="space-y-4">
            <audio ref={audioRef} src={audioUrl} className="w-full" controls />
            <div className="flex justify-between">
              <Button onClick={togglePlayPause} variant="outline">
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}