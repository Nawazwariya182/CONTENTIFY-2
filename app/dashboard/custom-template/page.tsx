'use client'

import React, { useState, useContext, useRef, useEffect } from 'react'
import Image from 'next/image'
// import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2Icon, ArrowLeft, Copy, RefreshCw } from "lucide-react"
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateContext } from '@/app/(context)/UpdateContext'
import { db } from '@/utils/db'
import { aioutput } from '@/utils/schema'
import { chatSession } from '@/utils/AIModel'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { toast } from 'react-hot-toast'

interface AIContentGeneratorProps {
  selectedTemplate?: {
    icon: string;
    name: string;
    desc: string;
    slug: string;
    aiprompt: string;
  }
}

export default function AIContentGenerator({ selectedTemplate }: AIContentGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState('')
  const { user } = useUser()
  const { TotalUsage, SetTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const editorRef = useRef<Editor>(null)
  const limit = 15000

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      editorInstance.setMarkdown(aiOutput)
    }
  }, [aiOutput])

  const generateAIContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (TotalUsage >= limit) {
      toast.error("Usage limit exceeded")
      return
    }

    setLoading(true)

    try {
      const finalPrompt = selectedTemplate 
        ? `${prompt}, ${selectedTemplate.aiprompt}`
        : prompt
      const result = await chatSession.sendMessage(finalPrompt)
      const aiResponse = await result?.response.text()
      setAiOutput(aiResponse)

      await saveOutputToDB(prompt, selectedTemplate?.slug || 'custom', aiResponse)

      if (setupdatecredit) {
        setupdatecredit(Date.now())
      }
      toast.success("Content generated successfully!")
    } catch (error) {
      console.error("Error generating AI content:", error)
      toast.error("Failed to generate content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const saveOutputToDB = async (formdata: string, slug: string, airesponse: string) => {
    try {
      await db.insert(aioutput).values({
        formdata: formdata,
        airesponse: airesponse,
        templateslug: slug,
        createby: user?.primaryEmailAddress?.emailAddress || '',
        createdat: moment().format('DD/MM/yyyy'),
      })
    } catch (error) {
      console.error("Error saving output to the database:", error)
      toast.error("Failed to save output. Please try again.")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setPrompt('')
    setAiOutput('')
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      editorInstance.setMarkdown('')
    }
  }

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Link href="/dashboard">
        <Button
          className="mb-6 bg-primary text-white hover:bg-white hover:text-primary border border-primary transition-all duration-300 ease-in-out"
          style={{ cursor: 'url(/poin.png), auto' }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <Image src={selectedTemplate?.icon || 'https://cdn-icons-png.flaticon.com/128/13963/13963247.png'} alt="icon" width={60} height={60} className="rounded-full" />
              <div>
                <h2 className="font-bold text-2xl mb-1 text-primary">{selectedTemplate?.name || 'Custom Template'}</h2>
                <p className="text-gray-600 text-sm">{selectedTemplate?.desc || 'Create your own template'}</p>
              </div>
            </div>
            <form onSubmit={generateAIContent} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">Enter Your Prompt</label>
                <Textarea 
                  id="prompt"
                  name="prompt" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  rows={6}
                  placeholder="Type your prompt here..."
                />
              </div>
              <Button
                type="submit"
                className="w-full py-2 bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
                style={{ cursor: 'url(/poin.png), auto' }}
                disabled={loading || TotalUsage > limit}
              >
                {loading ? <Loader2Icon className="animate-spin mr-2" /> : null}
                {loading ? 'Generating...' : 'Generate Content'}
              </Button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-primary">Your Result</h2>
              <div className="space-x-2">
                <Button
                  onClick={handleCopy}
                  className="bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
                  style={{ cursor: 'url(/poin.png), auto' }}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button
                  onClick={handleReset}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
                  style={{ cursor: 'url(/poin.png), auto' }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
            <div className="font-p border border-gray-200 rounded-lg overflow-hidden">
              <Editor
                ref={editorRef}
                initialValue={aiOutput || "Your result will appear here..."}
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                toolbarItems={[
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task', 'indent', 'outdent'],
                  ['table', 'image', 'link'],
                  ['code', 'codeblock']
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}