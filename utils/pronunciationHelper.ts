/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

export class PronunciationHelper {
  // Hindi pronunciation improvements
  private static hindiPronunciationMap = {
    // Common mispronunciations
    "आर्टिफिशियल इंटेलिजेंस": "आर्टिफिशल इंटेलिजेंस",
    टेक्नोलॉजी: "टेक्नोलोजी",
    कंप्यूटर: "कम्प्यूटर",
    इंटरनेट: "इंटरनेट",
    डेवलपमेंट: "डेवलपमेंट",
    प्रोग्रामिंग: "प्रोग्रामिंग",
    सॉफ्टवेयर: "सॉफ्टवेयर",
    हार्डवेयर: "हार्डवेयर",
    एप्लिकेशन: "एप्लिकेशन",
    डेटाबेस: "डेटाबेस",

    // Add phonetic spellings for better pronunciation
    AI: "ए आई",
    ML: "एम एल",
    API: "ए पी आई",
    UI: "यू आई",
    UX: "यू एक्स",
    CEO: "सी ई ओ",
    CTO: "सी टी ओ",
    IT: "आई टी",
    IoT: "आई ओ टी",
    VR: "वी आर",
    AR: "ए आर",

    // Common English words in Hindi context
    smartphone: "स्मार्टफोन",
    laptop: "लैपटॉप",
    website: "वेबसाइट",
    email: "ईमेल",
    password: "पासवर्ड",
    username: "यूजरनेम",
    download: "डाउनलोड",
    upload: "अपलोड",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
  }

  // Indian English pronunciation improvements
  private static indianEnglishMap = {
    // Common mispronunciations in Indian English
    schedule: "sked-yool",
    privacy: "pry-va-see",
    mobile: "mo-bile",
    vehicle: "vee-hi-kul",
    development: "de-vel-op-ment",
    government: "gov-ern-ment",
    important: "im-por-tant",
    different: "dif-fer-ent",
    interesting: "in-ter-est-ing",
    technology: "tek-nol-o-jee",
    university: "yoo-ni-ver-si-tee",
    opportunity: "op-por-tu-ni-tee",
    responsibility: "re-spon-si-bil-i-tee",
    communication: "kom-yoo-ni-kay-shun",
    organization: "or-gan-i-zay-shun",
    information: "in-for-may-shun",
    education: "ed-yoo-kay-shun",
    situation: "sit-yoo-ay-shun",
    population: "pop-yoo-lay-shun",
    pronunciation: "pro-nun-see-ay-shun",

    // Add pauses for better flow
    "artificial intelligence": "artificial... intelligence",
    "machine learning": "machine... learning",
    "data science": "data... science",
    "software engineering": "software... engineering",
    "computer science": "computer... science",
    "information technology": "information... technology",
  }

  static improveHindiPronunciation(text: string): string {
    let improvedText = text

    // Apply Hindi pronunciation improvements
    for (const [original, improved] of Object.entries(this.hindiPronunciationMap)) {
      const regex = new RegExp(original, "gi")
      improvedText = improvedText.replace(regex, improved)
    }

    // Add natural pauses after Hindi punctuation
    improvedText = improvedText.replace(/([।॥])/g, "$1 ")

    // Slow down complex words
    improvedText = improvedText.replace(/(आर्टिफिशल|टेक्नोलोजी|कम्प्यूटर|प्रोग्रामिंग)/g, "... $1 ...")

    return improvedText
  }

  static improveIndianEnglishPronunciation(text: string): string {
    let improvedText = text

    // Apply Indian English pronunciation improvements
    for (const [original, improved] of Object.entries(this.indianEnglishMap)) {
      const regex = new RegExp(`\\b${original}\\b`, "gi")
      improvedText = improvedText.replace(regex, improved)
    }

    // Add natural pauses for complex technical terms
    improvedText = improvedText.replace(
      /\b(artificial intelligence|machine learning|data science|software engineering|computer science)\b/gi,
      "... $1 ...",
    )

    // Slow down acronyms
    improvedText = improvedText.replace(/\b([A-Z]{2,})\b/g, (match) => {
      return match.split("").join(" ")
    })

    return improvedText
  }

  static improveScriptPronunciation(script: string, language: string): string {
    let improvedScript = script

    if (language.includes("hi")) {
      // Hindi improvements
      improvedScript = this.improveHindiPronunciation(improvedScript)
    } else if (language.includes("IN")) {
      // Indian English improvements
      improvedScript = this.improveIndianEnglishPronunciation(improvedScript)
    }

    // General improvements for all languages
    improvedScript = this.addNaturalPauses(improvedScript)
    improvedScript = this.improveNumberPronunciation(improvedScript)

    return improvedScript
  }

  private static addNaturalPauses(text: string): string {
    // Add pauses after punctuation
    return text
      .replace(/([.!?])\s+/g, "$1... ")
      .replace(/([,;:])\s+/g, "$1 ")
      .replace(/\s+/g, " ")
      .trim()
  }

  private static improveNumberPronunciation(text: string): string {
    // Convert numbers to words for better pronunciation
    const numberMap: { [key: string]: string } = {
      "1": "one",
      "2": "two",
      "3": "three",
      "4": "four",
      "5": "five",
      "6": "six",
      "7": "seven",
      "8": "eight",
      "9": "nine",
      "10": "ten",
      "2024": "twenty twenty four",
      "2025": "twenty twenty five",
    }

    let improvedText = text
    for (const [number, word] of Object.entries(numberMap)) {
      const regex = new RegExp(`\\b${number}\\b`, "g")
      improvedText = improvedText.replace(regex, word)
    }

    return improvedText
  }

  static getOptimalVoiceSettings(language: string, isHindi = false): any {
    if (isHindi || language.includes("hi")) {
      return {
        rate: 0.75, // Slower for Hindi
        pitch: 0.9,
        volume: 1.0,
        pauseBefore: 1000,
        pauseAfter: 1500,
      }
    } else if (language.includes("IN")) {
      return {
        rate: 0.8, // Slightly slower for Indian English
        pitch: 0.95,
        volume: 1.0,
        pauseBefore: 800,
        pauseAfter: 1200,
      }
    } else {
      return {
        rate: 0.85,
        pitch: 1.0,
        volume: 1.0,
        pauseBefore: 600,
        pauseAfter: 1000,
      }
    }
  }
}
