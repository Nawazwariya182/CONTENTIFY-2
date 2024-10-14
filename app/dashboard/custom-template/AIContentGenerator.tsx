'use client'

import React, { useState, useContext, useRef, useEffect } from 'react'
import Image from 'next/image'
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
import { generateCombinedText } from '@/utils/AIModel'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { toast } from 'react-hot-toast'

// Define Template interface for the structure of selectedTemplate
interface Template {
  icon: string;
  name: string;
  desc: string;
  slug: string;
  aiprompt: string;
}

interface AIContentGeneratorProps {
  selectedTemplate?: Template; // Optional selectedTemplate
}

function AIContentGenerator({ selectedTemplate }: AIContentGeneratorProps) {
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
      editorRef.current.getInstance().setMarkdown(aiOutput)
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
      const aiResponse = await generateCombinedText(finalPrompt)
      setAiOutput(aiResponse)

      await saveOutputToDB(prompt, selectedTemplate?.slug || 'custom', aiResponse)

      setupdatecredit?.(Date.now())
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
        formdata,
        airesponse,
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
    editorRef.current?.getInstance().setMarkdown('')
  }

  return (
    <div className="p-4 md:p-10 bg-back min-h-screen">
      <Link href="/dashboard">
        <Button
          className="mb-6 bg-prim text-back hover:bg-white hover:text-text hover:border-2 hover:border-acc transition-all duration-300 ease-in-out"
          style={{ cursor: 'url(/poin.png), auto' }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-lg p-6 border border-second">
            <div className="flex items-center gap-4 mb-6">
              <Image src={selectedTemplate?.icon || 'https://cdn-icons-png.flaticon.com/128/13963/13963247.png'} alt="icon" width={60} height={60} className="rounded-sm" />
              <div>
                <h2 className="font-bold text-2xl mb-1 text-prim">{selectedTemplate?.name || 'Custom Template'}</h2>
                <p className="text-text text-sm">{selectedTemplate?.desc || 'Create your own template'}</p>
              </div>
            </div>
            <form onSubmit={generateAIContent} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-text mb-1">Enter Your Prompt</label>
                <Textarea 
                  id="prompt"
                  name="prompt" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required 
                  className="w-full p-2 border border-second rounded-md focus:ring-prim focus:border-prim"
                  rows={3}
                  placeholder="Type your prompt here..."
                />
              </div>
              <Button
                type="submit"
                className="w-full py-2 bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-back transition-colors duration-300"
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
          <div className="bg-white rounded-lg shadow-lg p-6 border border-second">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-prim">Your Result</h2>
              <div className="space-x-2">
                <Button
                  onClick={handleCopy}
                  className="bg-prim text-white hover:bg-prim-dark transition-colors duration-300"
                  style={{ cursor: 'url(/poin.png), auto' }}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button
                  onClick={handleReset}
                  className="bg-second text-text hover:bg-second-light transition-colors duration-300"
                  style={{ cursor: 'url(/poin.png), auto' }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
            <div className="font-p border border-second rounded-lg overflow-hidden">
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

export default AIContentGenerator