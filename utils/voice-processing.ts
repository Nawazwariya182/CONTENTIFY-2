/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
export class VoiceProcessor {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private dynamicsCompressor: DynamicsCompressorNode | null = null;

  async initialize(stream: MediaStream, sensitivity: number) {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.gainNode = this.audioContext.createGain();
    this.dynamicsCompressor = this.audioContext.createDynamicsCompressor();

    // Configure analyser
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;

    // Configure compressor for noise reduction
    this.dynamicsCompressor.threshold.value = -50;
    this.dynamicsCompressor.knee.value = 40;
    this.dynamicsCompressor.ratio.value = 12;
    this.dynamicsCompressor.attack.value = 0;
    this.dynamicsCompressor.release.value = 0.25;

    // Set gain based on sensitivity
    this.gainNode.gain.value = sensitivity / 50; // Convert 0-100 to 0-2 range

    // Connect nodes
    this.source
      .connect(this.gainNode)
      .connect(this.dynamicsCompressor)
      .connect(this.analyser)
      .connect(this.audioContext.destination);
  }

  getAudioLevel(): number {
    if (!this.analyser) return 0;
    
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    
    // Calculate RMS value for better accuracy
    const rms = Math.sqrt(
      dataArray.reduce((sum, value) => sum + (value * value), 0) / dataArray.length
    );
    
    return rms;
  }

  updateSensitivity(sensitivity: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = sensitivity / 50;
    }
  }

  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

