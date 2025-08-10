/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

/**
 * Web-based audio processing utilities
 * Uses Web Audio API for client-side audio manipulation
 */

export interface AudioSegment {
  audioBuffer: ArrayBuffer
  speaker: string
  text: string
}

export class WebAudioProcessor {
  private audioContext: AudioContext

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }

  /**
   * Combine multiple audio segments into a single audio buffer
   */
  async combineAudioSegments(segments: AudioSegment[]): Promise<ArrayBuffer> {
    if (segments.length === 0) {
      throw new Error("No audio segments to combine")
    }

    const audioBuffers = await Promise.all(
      segments.map((segment) => this.audioContext.decodeAudioData(segment.audioBuffer.slice(0))),
    )

    // Calculate total duration
    const totalDuration = audioBuffers.reduce((sum, buffer) => sum + buffer.duration, 0)
    const sampleRate = audioBuffers[0].sampleRate
    const numberOfChannels = audioBuffers[0].numberOfChannels

    // Create combined buffer
    const combinedBuffer = this.audioContext.createBuffer(
      numberOfChannels,
      Math.ceil(totalDuration * sampleRate),
      sampleRate,
    )

    let offset = 0
    for (let i = 0; i < audioBuffers.length; i++) {
      const buffer = audioBuffers[i]

      // Add small pause between segments (0.5 seconds)
      if (i > 0) {
        offset += 0.5 * sampleRate
      }

      // Copy audio data
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel)
        combinedBuffer.getChannelData(channel).set(channelData, offset)
      }

      offset += buffer.length
    }

    // Convert back to ArrayBuffer (simplified - would need proper encoding)
    return this.audioBufferToArrayBuffer(combinedBuffer)
  }

  /**
   * Add background music to podcast
   */
  async addBackgroundMusic(
    podcastBuffer: ArrayBuffer,
    musicBuffer: ArrayBuffer,
    musicVolume = 0.1,
  ): Promise<ArrayBuffer> {
    const [podcastAudio, musicAudio] = await Promise.all([
      this.audioContext.decodeAudioData(podcastBuffer.slice(0)),
      this.audioContext.decodeAudioData(musicBuffer.slice(0)),
    ])

    const duration = podcastAudio.duration
    const sampleRate = podcastAudio.sampleRate
    const numberOfChannels = podcastAudio.numberOfChannels

    // Create output buffer
    const outputBuffer = this.audioContext.createBuffer(numberOfChannels, duration * sampleRate, sampleRate)

    // Mix audio
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const podcastData = podcastAudio.getChannelData(channel)
      const musicData = musicAudio.getChannelData(channel)
      const outputData = outputBuffer.getChannelData(channel)

      for (let i = 0; i < outputData.length; i++) {
        const musicIndex = i % musicData.length // Loop music
        outputData[i] = podcastData[i] + musicData[musicIndex] * musicVolume
      }
    }

    return this.audioBufferToArrayBuffer(outputBuffer)
  }

  /**
   * Convert AudioBuffer to ArrayBuffer (simplified)
   */
  private audioBufferToArrayBuffer(audioBuffer: AudioBuffer): ArrayBuffer {
    // This is a simplified conversion
    // In production, you'd use a proper audio encoder like lamejs for MP3
    const length = audioBuffer.length * audioBuffer.numberOfChannels * 2
    const arrayBuffer = new ArrayBuffer(length)
    const view = new Int16Array(arrayBuffer)

    let offset = 0
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        view[offset++] = Math.max(-1, Math.min(1, channelData[i])) * 0x7fff
      }
    }

    return arrayBuffer
  }

  /**
   * Generate silence buffer
   */
  createSilence(duration: number, sampleRate = 44100): AudioBuffer {
    const buffer = this.audioContext.createBuffer(2, duration * sampleRate, sampleRate)
    return buffer
  }

  /**
   * Apply fade in/out effects
   */
  applyFade(audioBuffer: AudioBuffer, fadeInDuration = 0.1, fadeOutDuration = 0.1): AudioBuffer {
    const sampleRate = audioBuffer.sampleRate
    const fadeInSamples = fadeInDuration * sampleRate
    const fadeOutSamples = fadeOutDuration * sampleRate

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel)

      // Fade in
      for (let i = 0; i < fadeInSamples && i < channelData.length; i++) {
        channelData[i] *= i / fadeInSamples
      }

      // Fade out
      const startFadeOut = channelData.length - fadeOutSamples
      for (let i = startFadeOut; i < channelData.length; i++) {
        channelData[i] *= (channelData.length - i) / fadeOutSamples
      }
    }

    return audioBuffer
  }
}

/**
 * Client-side audio processing hook
 */
export function useAudioProcessor() {
  const processor = new WebAudioProcessor()

  const processAudioSegments = async (segments: AudioSegment[]) => {
    try {
      const combinedAudio = await processor.combineAudioSegments(segments)
      return combinedAudio
    } catch (error) {
      console.error("Error processing audio:", error)
      throw error
    }
  }

  const addBackgroundMusic = async (podcastAudio: ArrayBuffer, musicAudio: ArrayBuffer) => {
    try {
      const result = await processor.addBackgroundMusic(podcastAudio, musicAudio, 0.1)
      return result
    } catch (error) {
      console.error("Error adding background music:", error)
      throw error
    }
  }

  return {
    processAudioSegments,
    addBackgroundMusic,
    processor,
  }
}
