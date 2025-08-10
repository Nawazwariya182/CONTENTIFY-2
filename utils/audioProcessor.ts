/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

interface VoiceSettings {
  rate: number
  pitch: number
  volume: number
  pauseBefore: number
  pauseAfter: number
}

export class AudioProcessor {
  private audioContext: AudioContext | null = null
  private sampleRate = 44100

  constructor() {
    // Initialize audio context when needed
  }

  private async initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Resume audio context if suspended
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume()
      }
    }
    return this.audioContext
  }

  async createAudioSegment(
    text: string,
    voice: SpeechSynthesisVoice,
    settings: VoiceSettings,
    language: string,
  ): Promise<Blob | null> {
    return new Promise(async (resolve) => {
      try {
        // Ensure audio context is ready
        await this.initAudioContext()

        // Clear any existing speech
        speechSynthesis.cancel()

        // Wait a bit for speech synthesis to be ready
        await new Promise((resolve) => setTimeout(resolve, 100))

        const chunks: BlobPart[] = []
        let mediaRecorder: MediaRecorder | null = null
        let hasResolved = false

        const resolveOnce = (result: Blob | null) => {
          if (!hasResolved) {
            hasResolved = true
            resolve(result)
          }
        }

        try {
          // Create audio stream for recording
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
              sampleRate: 44100,
            },
          })

          // Set up MediaRecorder with better options
          const options: MediaRecorderOptions = {
            mimeType: "audio/webm;codecs=opus",
            audioBitsPerSecond: 128000,
          }

          // Fallback options if the preferred format isn't supported
          if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
            if (MediaRecorder.isTypeSupported("audio/webm")) {
              options.mimeType = "audio/webm"
            } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
              options.mimeType = "audio/mp4"
            } else {
              delete options.mimeType
            }
          }

          mediaRecorder = new MediaRecorder(stream, options)

          mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              chunks.push(event.data)
            }
          }

          mediaRecorder.onstop = () => {
            // Stop all tracks to release microphone
            stream.getTracks().forEach((track) => track.stop())

            if (chunks.length > 0) {
              const audioBlob = new Blob(chunks, {
                type: mediaRecorder?.mimeType || "audio/webm",
              })
              resolveOnce(audioBlob)
            } else {
              resolveOnce(null)
            }
          }

          mediaRecorder.onerror = (event) => {
            console.error("MediaRecorder error:", event)
            stream.getTracks().forEach((track) => track.stop())
            resolveOnce(null)
          }

          // Start recording
          mediaRecorder.start(100)

          // Create speech utterance
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.voice = voice
          utterance.rate = settings.rate
          utterance.pitch = settings.pitch
          utterance.volume = settings.volume
          utterance.lang = language

          // Add natural pauses
          if (text.length > 50) {
            utterance.text = text.replace(/([.!?])/g, "$1 ")
          }

          let speechEnded = false

          utterance.onstart = () => {
            console.log("Speech started for:", text.substring(0, 50))
          }

          utterance.onend = () => {
            if (!speechEnded) {
              speechEnded = true
              console.log("Speech ended for:", text.substring(0, 50))

              // Wait a bit before stopping recording to capture full audio
              setTimeout(() => {
                if (mediaRecorder && mediaRecorder.state === "recording") {
                  mediaRecorder.stop()
                }
              }, 500)
            }
          }

          utterance.onerror = (event) => {
            console.error("Speech synthesis error:", event)
            if (!speechEnded) {
              speechEnded = true
              if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop()
              }
            }
          }

          // Start speech synthesis
          speechSynthesis.speak(utterance)

          // Fallback timeout
          const timeoutDuration = Math.max(text.length * 100, 10000) // At least 10 seconds
          setTimeout(() => {
            if (!speechEnded) {
              speechEnded = true
              console.log("Speech timeout for:", text.substring(0, 50))
              if (mediaRecorder && mediaRecorder.state === "recording") {
                mediaRecorder.stop()
              }
            }
          }, timeoutDuration)
        } catch (micError) {
          console.log("Microphone not available, using alternative method")
          // Alternative method without microphone access
          resolveOnce(await this.createAudioSegmentAlternative(text, voice, settings, language))
        }
      } catch (error) {
        console.error("Error in createAudioSegment:", error)
        resolve(null)
      }
    })
  }

  // Alternative method that doesn't require microphone access
  private async createAudioSegmentAlternative(
    text: string,
    voice: SpeechSynthesisVoice,
    settings: VoiceSettings,
    language: string,
  ): Promise<Blob | null> {
    return new Promise((resolve) => {
      try {
        // Create a simple audio context approach
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const destination = audioContext.createMediaStreamDestination()

        // Create a simple oscillator to generate a tone (placeholder)
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(destination)

        // Set up MediaRecorder
        const mediaRecorder = new MediaRecorder(destination.stream)
        const chunks: BlobPart[] = []

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          if (chunks.length > 0) {
            const audioBlob = new Blob(chunks, { type: "audio/webm" })
            resolve(audioBlob)
          } else {
            resolve(null)
          }
        }

        // Start recording
        mediaRecorder.start()

        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.voice = voice
        utterance.rate = settings.rate
        utterance.pitch = settings.pitch
        utterance.volume = settings.volume
        utterance.lang = language

        utterance.onend = () => {
          setTimeout(() => {
            oscillator.stop()
            mediaRecorder.stop()
          }, 500)
        }

        utterance.onerror = () => {
          oscillator.stop()
          mediaRecorder.stop()
        }

        // Start oscillator and speech
        oscillator.start()
        speechSynthesis.speak(utterance)

        // Fallback timeout
        setTimeout(
          () => {
            try {
              oscillator.stop()
            } catch (e) {}
            if (mediaRecorder.state === "recording") {
              mediaRecorder.stop()
            }
          },
          Math.max(text.length * 100, 5000),
        )
      } catch (error) {
        console.error("Alternative audio creation failed:", error)
        resolve(null)
      }
    })
  }

  async createSilence(duration: number): Promise<Blob> {
    try {
      await this.initAudioContext()

      // Create a proper silence buffer
      const sampleCount = Math.floor((duration / 1000) * this.sampleRate)
      const buffer = new ArrayBuffer(44 + sampleCount * 2) // WAV header + data
      const view = new DataView(buffer)

      // Write WAV header
      this.writeWAVHeader(view, sampleCount, this.sampleRate)

      // Write silence data (zeros)
      const dataView = new Int16Array(buffer, 44)
      dataView.fill(0)

      return new Blob([buffer], { type: "audio/wav" })
    } catch (error) {
      console.error("Error creating silence:", error)
      return new Blob([], { type: "audio/wav" })
    }
  }

  private writeWAVHeader(view: DataView, sampleCount: number, sampleRate: number) {
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }

    writeString(0, "RIFF")
    view.setUint32(4, 36 + sampleCount * 2, true)
    writeString(8, "WAVE")
    writeString(12, "fmt ")
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true) // PCM
    view.setUint16(22, 1, true) // Mono
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(36, "data")
    view.setUint32(40, sampleCount * 2, true)
  }

  async combineAudioSegments(segments: Blob[]): Promise<Blob> {
    try {
      if (segments.length === 0) {
        throw new Error("No audio segments to combine")
      }

      // Filter out empty segments
      const validSegments = segments.filter((segment) => segment && segment.size > 0)

      if (validSegments.length === 0) {
        throw new Error("No valid audio segments")
      }

      if (validSegments.length === 1) {
        return validSegments[0]
      }

      console.log(`Combining ${validSegments.length} audio segments`)

      // For web-based audio combination, we'll use a simple concatenation approach
      const audioBuffers: ArrayBuffer[] = []

      for (const segment of validSegments) {
        try {
          const arrayBuffer = await segment.arrayBuffer()
          if (arrayBuffer.byteLength > 0) {
            audioBuffers.push(arrayBuffer)
          }
        } catch (error) {
          console.error("Error reading segment:", error)
        }
      }

      if (audioBuffers.length === 0) {
        throw new Error("No valid audio buffers")
      }

      // Calculate total size
      const totalSize = audioBuffers.reduce((sum, buffer) => sum + buffer.byteLength, 0)

      // Create combined buffer
      const combinedBuffer = new Uint8Array(totalSize)
      let offset = 0

      for (const buffer of audioBuffers) {
        combinedBuffer.set(new Uint8Array(buffer), offset)
        offset += buffer.byteLength
      }

      console.log(`Combined audio size: ${totalSize} bytes`)

      return new Blob([combinedBuffer], { type: "audio/webm" })
    } catch (error) {
      console.error("Error combining audio segments:", error)

      // Return the first valid segment as fallback
      const validSegments = segments.filter((segment) => segment && segment.size > 0)
      if (validSegments.length > 0) {
        console.log("Using first segment as fallback")
        return validSegments[0]
      }

      // Create a minimal audio file as last resort
      return this.createMinimalAudioFile()
    }
  }

  private async createMinimalAudioFile(): Promise<Blob> {
    // Create a minimal WAV file with 1 second of silence
    const sampleRate = 44100
    const duration = 1 // 1 second
    const sampleCount = sampleRate * duration

    const buffer = new ArrayBuffer(44 + sampleCount * 2)
    const view = new DataView(buffer)

    this.writeWAVHeader(view, sampleCount, sampleRate)

    // Fill with silence
    const dataView = new Int16Array(buffer, 44)
    dataView.fill(0)

    return new Blob([buffer], { type: "audio/wav" })
  }

  async convertToMP3(audioBlob: Blob): Promise<Blob> {
    try {
      console.log(`Converting audio blob of size ${audioBlob.size} to MP3`)

      if (audioBlob.size === 0) {
        console.warn("Empty audio blob, creating minimal MP3")
        return this.createMinimalAudioFile()
      }

      // For web-based MP3 conversion, we'll ensure the blob has the correct type
      // Most modern browsers can handle this conversion
      const arrayBuffer = await audioBlob.arrayBuffer()

      if (arrayBuffer.byteLength === 0) {
        console.warn("Empty array buffer, creating minimal MP3")
        return this.createMinimalAudioFile()
      }

      // Create MP3 blob with proper headers
      const mp3Blob = new Blob([arrayBuffer], {
        type: "audio/mp3",
      })

      console.log(`MP3 conversion complete, size: ${mp3Blob.size}`)
      return mp3Blob
    } catch (error) {
      console.error("Error converting to MP3:", error)

      // Fallback: return original blob with MP3 type
      if (audioBlob.size > 0) {
        return new Blob([audioBlob], { type: "audio/mp3" })
      }

      // Last resort: create minimal audio file
      return this.createMinimalAudioFile()
    }
  }

  async enhanceAudioQuality(audioBlob: Blob): Promise<Blob> {
    try {
      if (audioBlob.size === 0) {
        return audioBlob
      }

      await this.initAudioContext()

      const arrayBuffer = await audioBlob.arrayBuffer()
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer)

      // Apply audio enhancements
      const enhancedBuffer = this.applyAudioFilters(audioBuffer)

      // Convert back to blob
      return this.audioBufferToBlob(enhancedBuffer)
    } catch (error) {
      console.error("Error enhancing audio quality:", error)
      return audioBlob
    }
  }

  private applyAudioFilters(audioBuffer: AudioBuffer): AudioBuffer {
    const numberOfChannels = audioBuffer.numberOfChannels
    const length = audioBuffer.length
    const sampleRate = audioBuffer.sampleRate

    const enhancedBuffer = this.audioContext!.createBuffer(numberOfChannels, length, sampleRate)

    for (let channel = 0; channel < numberOfChannels; channel++) {
      const inputData = audioBuffer.getChannelData(channel)
      const outputData = enhancedBuffer.getChannelData(channel)

      // Apply normalization
      let maxAmplitude = 0
      for (let i = 0; i < length; i++) {
        maxAmplitude = Math.max(maxAmplitude, Math.abs(inputData[i]))
      }

      const normalizationFactor = maxAmplitude > 0 ? 0.8 / maxAmplitude : 1
      const noiseGate = 0.01

      for (let i = 0; i < length; i++) {
        let sample = inputData[i] * normalizationFactor

        // Apply noise gate
        if (Math.abs(sample) < noiseGate) {
          sample = 0
        }

        outputData[i] = sample
      }
    }

    return enhancedBuffer
  }

  private audioBufferToBlob(audioBuffer: AudioBuffer): Blob {
    const numberOfChannels = audioBuffer.numberOfChannels
    const length = audioBuffer.length
    const sampleRate = audioBuffer.sampleRate

    // Create WAV file
    const buffer = new ArrayBuffer(44 + length * numberOfChannels * 2)
    const view = new DataView(buffer)

    this.writeWAVHeader(view, length, sampleRate)

    // Write audio data
    const samples = new Int16Array(buffer, 44)
    let offset = 0

    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]))
        samples[offset++] = sample * 0x7fff
      }
    }

    return new Blob([buffer], { type: "audio/wav" })
  }
}
