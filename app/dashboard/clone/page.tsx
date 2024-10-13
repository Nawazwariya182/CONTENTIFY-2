'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mic, Upload, Play, Pause, Download } from "lucide-react"
import { toast } from 'react-hot-toast'
import { cloneVoice } from '@/utils/Clone'

const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TEXT_SIZE = 1 * 1024 * 1024; // 1MB

export default function VoiceCloningFrontend() {
  const [audioData, setAudioData] = useState<string | null>(null)
  const [inputText, setInputText] = useState('')
  const [gender, setGender] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [outputAudioUrl, setOutputAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    setIsButtonDisabled(!audioData || !inputText || !gender || isProcessing)
    console.log("Button state updated:", { audioData: !!audioData, inputText: !!inputText, gender: !!gender, isProcessing })
  }, [audioData, inputText, gender, isProcessing])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      const chunks: Blob[] = []

      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        if (blob.size > MAX_AUDIO_SIZE) {
          toast.error('Audio file size exceeds 10MB limit')
          return
        }
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          setAudioData(base64Audio.split(',')[1])
          console.log("Audio data set from recording")
        }
        reader.readAsDataURL(blob)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
      toast.error('Failed to start recording. Please check your microphone permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.match('audio/(mp3|wav)')) {
        toast.error('Please upload an MP3 or WAV file.')
        return
      }
      if (file.size > MAX_AUDIO_SIZE) {
        toast.error('Audio file size exceeds 10MB limit')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64Audio = reader.result as string;
        setAudioData(base64Audio.split(',')[1])
        console.log("Audio data set from file upload")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length * 2 > MAX_TEXT_SIZE) { // Approximate size calculation
      toast.error('Text input exceeds 1MB limit')
      return
    }
    setInputText(text)
  }

  const handleTextFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.match('text/plain|text/srt|text/vtt')) {
        toast.error('Please upload a .txt, .srt, or .vtt file.')
        return
      }
      if (file.size > MAX_TEXT_SIZE) {
        toast.error('Text file size exceeds 1MB limit')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const text = reader.result as string;
        setInputText(text)
        console.log("Text data set from file upload")
      }
      reader.readAsText(file)
    }
  }

  const runModel = useCallback(async () => {
    if (!audioData || !inputText || !gender) {
      toast.error('Please provide all required inputs')
      console.log("Missing inputs:", { audioData: !!audioData, inputText: !!inputText, gender: !!gender })
      return
    }

    setIsProcessing(true)

    try {
      console.log("Calling cloneVoice with:", { audioDataLength: audioData.length, inputText, gender })
      const result = await cloneVoice(audioData, inputText, gender)
      if (result) {
        setOutputAudioUrl(result)
        toast.success('Voice cloning completed successfully!')
      } else {
        throw new Error('Voice cloning failed: No result returned')
      }
    } catch (error) {
      console.error('Error in voice cloning:', error)
      if (error instanceof Error && error.message.includes('err.invalid_input_data_or_input_url')) {
        toast.error('Invalid input data or URL. Please check your inputs and try again.')
      } else {
        toast.error(`Failed to process voice cloning: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    } finally {
      setIsProcessing(false)
    }
  }, [audioData, inputText, gender])

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
    if (outputAudioUrl) {
      const link = document.createElement('a')
      link.href = outputAudioUrl
      link.download = 'cloned_voice.mp3'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Voice Cloning</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Voice Input (MP3 or WAV, max 10MB)</h3>
          <div className="flex space-x-2">
            <Button onClick={isRecording ? stopRecording : startRecording} variant="outline">
              <Mic className="mr-2 h-4 w-4" />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <Input
              type="file"
              accept="audio/mp3,audio/wav"
              onChange={handleFileUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
          {audioData && <p className="text-sm text-green-600">Audio input received</p>}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Input Text (max 1MB)</h3>
          <Textarea
            value={inputText}
            onChange={handleTextInput}
            placeholder="Enter the text to be spoken in the cloned voice"
            rows={3}
          />
          <Input
            type="file"
            accept=".txt,.srt,.vtt"
            onChange={handleTextFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Gender</h3>
          <Select onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={runModel}
          disabled={isButtonDisabled}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Clone Voice'
          )}
        </Button>

        {outputAudioUrl && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cloned Voice Output</h3>
            <audio ref={audioRef} src={outputAudioUrl} className="w-full" controls />
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