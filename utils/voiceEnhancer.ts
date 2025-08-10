/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

export interface VoiceProfile {
  name: string
  gender: "Male" | "Female" | "Unknown"
  accent: string
  region: string
  quality: "High" | "Medium" | "Basic"
  naturalness: number
  characteristics: string[]
}

export class VoiceEnhancer {
  private static voicePatterns = {
    // Gender detection patterns
    female: [
      "female",
      "woman",
      "girl",
      "samantha",
      "susan",
      "victoria",
      "karen",
      "moira",
      "tessa",
      "rishi",
      "fiona",
      "veena",
      "amelie",
      "marie",
      "paulina",
      "monica",
      "luciana",
      "zira",
      "hazel",
      "catherine",
      "anna",
      "elena",
      "isabelle",
    ],
    male: [
      "male",
      "man",
      "boy",
      "daniel",
      "alex",
      "fred",
      "ralph",
      "jorge",
      "diego",
      "carlos",
      "thomas",
      "nicolas",
      "yuri",
      "otoya",
      "aaron",
      "david",
      "mark",
      "paul",
      "richard",
      "george",
      "james",
      "william",
      "benjamin",
    ],

    // Accent/Region patterns
    accents: {
      "en-US": { name: "American English", region: "United States", patterns: ["us", "american", "united states"] },
      "en-GB": { name: "British English", region: "United Kingdom", patterns: ["gb", "uk", "british", "england"] },
      "en-AU": { name: "Australian English", region: "Australia", patterns: ["au", "australian", "australia"] },
      "en-CA": { name: "Canadian English", region: "Canada", patterns: ["ca", "canadian", "canada"] },
      "en-IN": { name: "Indian English", region: "India", patterns: ["in", "indian", "india"] },
      "en-ZA": { name: "South African English", region: "South Africa", patterns: ["za", "south african"] },
      "es-ES": { name: "European Spanish", region: "Spain", patterns: ["es", "spain", "european"] },
      "es-MX": { name: "Mexican Spanish", region: "Mexico", patterns: ["mx", "mexican", "mexico"] },
      "es-AR": { name: "Argentinian Spanish", region: "Argentina", patterns: ["ar", "argentinian", "argentina"] },
      "fr-FR": { name: "European French", region: "France", patterns: ["fr", "france", "european"] },
      "fr-CA": { name: "Canadian French", region: "Canada", patterns: ["ca", "canadian", "quebec"] },
    },

    // Quality indicators
    highQuality: ["enhanced", "premium", "neural", "natural", "pro", "plus", "hd"],
    basicQuality: ["compact", "basic", "lite", "mini", "simple"],
  }

  static enhanceVoice(voice: SpeechSynthesisVoice): VoiceProfile {
    const name = voice.name.toLowerCase()
    const lang = voice.lang.toLowerCase()

    // Detect gender
    let gender: "Male" | "Female" | "Unknown" = "Unknown"
    if (this.voicePatterns.female.some((pattern) => name.includes(pattern))) {
      gender = "Female"
    } else if (this.voicePatterns.male.some((pattern) => name.includes(pattern))) {
      gender = "Male"
    }

    // Detect accent and region
    let accent = voice.lang
    let region = "Standard"

    for (const [code, info] of Object.entries(this.voicePatterns.accents)) {
      if (
        lang.includes(code.toLowerCase()) ||
        info.patterns.some((pattern) => name.includes(pattern) || lang.includes(pattern))
      ) {
        accent = info.name
        region = info.region
        break
      }
    }

    // Assess quality
    let quality: "High" | "Medium" | "Basic" = "Medium"
    let naturalness = 0.6

    if (voice.localService === false) {
      quality = "High"
      naturalness = 0.9
    } else if (this.voicePatterns.highQuality.some((pattern) => name.includes(pattern))) {
      quality = "High"
      naturalness = 0.8
    } else if (this.voicePatterns.basicQuality.some((pattern) => name.includes(pattern))) {
      quality = "Basic"
      naturalness = 0.4
    }

    // Generate characteristics
    const characteristics = []
    if (voice.localService === false) characteristics.push("Cloud-based")
    if (name.includes("neural")) characteristics.push("Neural")
    if (name.includes("wavenet")) characteristics.push("WaveNet")
    if (quality === "High") characteristics.push("High Quality")
    if (naturalness > 0.7) characteristics.push("Natural")

    return {
      name: voice.name,
      gender,
      accent,
      region,
      quality,
      naturalness,
      characteristics,
    }
  }

  static getOptimalVoicePair(voices: VoiceProfile[]): [VoiceProfile | null, VoiceProfile | null] {
    if (voices.length < 2) return [voices[0] || null, voices[1] || null]

    // Sort by quality and naturalness
    const sortedVoices = voices.sort((a, b) => {
      const qualityScore = { High: 3, Medium: 2, Basic: 1 }
      const aScore = qualityScore[a.quality] + a.naturalness
      const bScore = qualityScore[b.quality] + b.naturalness
      return bScore - aScore
    })

    // Try to find different genders
    const maleVoices = sortedVoices.filter((v) => v.gender === "Male")
    const femaleVoices = sortedVoices.filter((v) => v.gender === "Female")

    if (maleVoices.length > 0 && femaleVoices.length > 0) {
      return [femaleVoices[0], maleVoices[0]]
    }

    // Try to find different accents
    const uniqueAccents: string[] = []
    for (let i = 0; i < sortedVoices.length; i++) {
      const accent = sortedVoices[i].accent
      if (uniqueAccents.indexOf(accent) === -1) {
        uniqueAccents.push(accent)
      }
    }
    if (uniqueAccents.length > 1) {
      const voice1 = sortedVoices.find((v) => v.accent === uniqueAccents[0])
      const voice2 = sortedVoices.find((v) => v.accent === uniqueAccents[1])
      return [voice1 || null, voice2 || null]
    }

    // Fallback to first two best voices
    return [sortedVoices[0], sortedVoices[1]]
  }

  static generateConversationalFillers(language: string): string[] {
    const fillers = {
      en: ["um", "uh", "you know", "like", "well", "so", "actually", "I mean", "right", "okay"],
      hi: ["अरे", "हाँ", "तो", "यानी", "वैसे", "अच्छा", "ठीक है"],
      es: ["eh", "bueno", "pues", "o sea", "digamos", "entonces", "claro"],
      fr: ["euh", "bon", "alors", "c'est-à-dire", "disons", "voilà", "donc"],
      de: ["äh", "also", "nun", "das heißt", "sozusagen", "ja", "gut"],
      pt: ["né", "então", "tipo", "ou seja", "bom", "certo", "assim"],
      it: ["eh", "allora", "cioè", "diciamo", "bene", "ecco"],
      ja: ["えーと", "あの", "そう", "まあ", "はい"],
      ko: ["음", "그", "아", "네", "뭐"],
      ru: ["э", "ну", "то есть", "значит", "так"],
      zh: ["呃", "那个", "就是", "嗯", "对"],
    }

    const langCode = language.split("-")[0]
    return fillers[langCode as keyof typeof fillers] || fillers.en
  }

  static addNaturalPauses(text: string): string {
    // Add natural pauses at punctuation
    return text
      .replace(/([.!?])\s+/g, "$1... ")
      .replace(/([,;:])\s+/g, "$1 ")
      .replace(/\s+/g, " ")
      .trim()
  }

  static createSpeechVariations(text: string, speakerIndex: number): string {
    // Add slight variations to make speakers sound different
    const variations = [
      // Speaker 1 variations (more formal)
      (text: string) => text.replace(/\bI think\b/g, "I believe"),
      (text: string) => text.replace(/\bokay\b/g, "alright"),

      // Speaker 2 variations (more casual)
      (text: string) => text.replace(/\bI believe\b/g, "I think"),
      (text: string) => text.replace(/\balright\b/g, "okay"),
    ]

    const speakerVariations = variations.slice(speakerIndex * 2, (speakerIndex + 1) * 2)
    return speakerVariations.reduce((acc, variation) => variation(acc), text)
  }
}
