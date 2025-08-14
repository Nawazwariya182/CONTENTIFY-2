import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenAI } from "@google/genai"

export interface VoiceOption {
  name: string
  gender: "Male" | "Female" | "Neutral"
  description: string
}

export const VOICE_OPTIONS: VoiceOption[] = [
  { name: "Zephyr", gender: "Male", description: "Warm, professional male voice" },
  { name: "Puck", gender: "Male", description: "Energetic, youthful male voice" },
]

async function enhancePromptWithGemini(prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  const enhancePrompt = `Enhance and expand upon the following prompt to make it more detailed and specific: "${prompt}" and don't give in html format`

  const result = await model.generateContent(enhancePrompt)
  const response = await result.response
  return response.text()
}

export async function generatePodcastScript(
  topic: string,
  mode: "single" | "multi",
  duration: number,
  tone: string,
): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

  try {
    const enhancedTopic = await enhancePromptWithGemini(topic)

    const prompt =
      mode === "single"
        ? `Create a ${duration}-minute ${tone} script about "${enhancedTopic}". 
         Write it as a single speaker presentation with natural pauses and engaging content.
         Make it conversational and informative. Aim for approximately ${duration * 150} words.`
        : `Create a ${duration}-minute ${tone} podcast script about "${enhancedTopic}".
         Format it as a dialogue between two speakers:
         Speaker 1: [dialogue]
         Speaker 2: [dialogue]
         
         Make it engaging, informative, and natural. Include back-and-forth conversation,
         questions, and different perspectives on the topic. Aim for approximately ${duration * 150} words.`

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating script:", error)
    throw new Error("Failed to generate script. Please check your API key and try again.")
  }
}

export async function convertTextToPodcastScript(rawText: string, duration: number, tone: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

  try {
    const prompt = `Convert the following text into a ${duration}-minute ${tone} podcast script between two speakers.
    
    Original text: "${rawText}"
    
    Transform this into an engaging dialogue format:
    Speaker 1: [dialogue]
    Speaker 2: [dialogue]
    
    Make it conversational, natural, and engaging. The speakers should discuss, analyze, and expand on the content.
    Include back-and-forth conversation, questions, and different perspectives. 
    Aim for approximately ${duration * 150} words.`

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error converting text to script:", error)
    throw new Error("Failed to convert text to script. Please check your API key and try again.")
  }
}

export async function generateTextToSpeech(text: string, mode: "single" | "multi"): Promise<Blob> {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
  })

  if (mode === "single") {
    // Single speaker implementation from first attachment
    const config = {
      temperature: 1,
      responseModalities: ["audio"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Zephyr",
          },
        },
      },
    }

    const model = "gemini-2.5-flash-preview-tts"
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: text,
          },
        ],
      },
    ]

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    })

    const audioChunks: Buffer[] = []

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue
      }
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData
        let buffer = Buffer.from(inlineData.data || "", "base64")
        if (!inlineData.mimeType || !inlineData.mimeType.includes("wav")) {
          buffer = convertToWav(inlineData.data || "", inlineData.mimeType || "")
        }
        audioChunks.push(buffer)
      }
    }

    const combinedBuffer = Buffer.concat(audioChunks)
    return new Blob([combinedBuffer], { type: "audio/wav" })
  } else {
    // Multi-speaker implementation from second attachment
    const config = {
      temperature: 1,
      responseModalities: ["audio"],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: [
            {
              speaker: "Speaker 1",
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Zephyr",
                },
              },
            },
            {
              speaker: "Speaker 2",
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Puck",
                },
              },
            },
          ],
        },
      },
    }

    const model = "gemini-2.5-flash-preview-tts"
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: text,
          },
        ],
      },
    ]

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    })

    const audioChunks: Buffer[] = []

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue
      }
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData
        let buffer = Buffer.from(inlineData.data || "", "base64")
        if (!inlineData.mimeType || !inlineData.mimeType.includes("wav")) {
          buffer = convertToWav(inlineData.data || "", inlineData.mimeType || "")
        }
        audioChunks.push(buffer)
      }
    }

    const combinedBuffer = Buffer.concat(audioChunks)
    return new Blob([combinedBuffer], { type: "audio/wav" })
  }
}

interface WavConversionOptions {
  numChannels: number
  sampleRate: number
  bitsPerSample: number
}

function convertToWav(rawData: string, mimeType: string) {
  const options = parseMimeType(mimeType)
  const wavHeader = createWavHeader(rawData.length, options)
  const buffer = Buffer.from(rawData, "base64")

  return Buffer.concat([wavHeader, buffer])
}

function parseMimeType(mimeType: string) {
  const [fileType, ...params] = mimeType.split(";").map((s) => s.trim())
  const [_, format] = fileType.split("/")

  const options: Partial<WavConversionOptions> = {
    numChannels: 1,
  }

  if (format && format.startsWith("L")) {
    const bits = Number.parseInt(format.slice(1), 10)
    if (!isNaN(bits)) {
      options.bitsPerSample = bits
    }
  }

  for (const param of params) {
    const [key, value] = param.split("=").map((s) => s.trim())
    if (key === "rate") {
      options.sampleRate = Number.parseInt(value, 10)
    }
  }

  return options as WavConversionOptions
}

function createWavHeader(dataLength: number, options: WavConversionOptions) {
  const { numChannels, sampleRate, bitsPerSample } = options

  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8
  const blockAlign = (numChannels * bitsPerSample) / 8
  const buffer = Buffer.alloc(44)

  buffer.write("RIFF", 0) // ChunkID
  buffer.writeUInt32LE(36 + dataLength, 4) // ChunkSize
  buffer.write("WAVE", 8) // Format
  buffer.write("fmt ", 12) // Subchunk1ID
  buffer.writeUInt32LE(16, 16) // Subchunk1Size (PCM)
  buffer.writeUInt16LE(1, 20) // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22) // NumChannels
  buffer.writeUInt32LE(sampleRate, 24) // SampleRate
  buffer.writeUInt32LE(byteRate, 28) // ByteRate
  buffer.writeUInt16LE(blockAlign, 32) // BlockAlign
  buffer.writeUInt16LE(bitsPerSample, 34) // BitsPerSample
  buffer.write("data", 36) // Subchunk2ID
  buffer.writeUInt32LE(dataLength, 40) // Subchunk2Size

  return buffer
}
