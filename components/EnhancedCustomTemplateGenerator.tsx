// 'use client'

// import React, { useState, useRef, useEffect, useContext } from 'react'
// import Image from 'next/image'
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Loader2Icon, ArrowLeft, Copy, RefreshCw, Edit2 } from 'lucide-react'
// import Link from 'next/link'
// import { useUser } from '@clerk/nextjs'
// import moment from 'moment'
// import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
// import { UpdateContext } from '@/app/(context)/UpdateContext'
// import { db } from '@/utils/db'
// import { aioutput } from '@/utils/schema'
// import { generateEnhancedContent } from '@/utils/enhancedAIModel'
// import dynamic from 'next/dynamic'
// import { useToast } from "@/components/ui/use-toast"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import '@toast-ui/editor/dist/toastui-editor.css'

// const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), {
//   ssr: false,
//   loading: () => <p>Loading editor...</p>
// })

// const THEME = {
//   primary: {
//     gradient: 'from-blue-600 to-purple-600',
//     hover: 'from-blue-700 to-purple-700',
//     text: 'text-black',
//     border: 'border-purple-600',
//   },
//   secondary: {
//     gradient: 'from-blue-100 to-purple-100',
//     hover: 'from-blue-200 to-purple-200',
//     text: 'text-black',
//     border: 'border-purple-200',
//   },
//   accent: {
//     gradient: 'from-indigo-500 to-purple-500',
//     hover: 'from-indigo-600 to-purple-600',
//     text: 'text-black',
//     border: 'border-purple-500',
//   }
// } as const;

// function EnhancedCustomTemplateGenerator() {
//   const [prompt, setPrompt] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [contentLoading, setContentLoading] = useState(false)
//   const [aiOutput, setAiOutput] = useState('')
//   const [refinedPrompt, setRefinedPrompt] = useState('')
//   const { user } = useUser()
//   const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
//   const { setupdatecredit } = useContext(UpdateContext)
//   const editorRef = useRef<any>(null)
//   const { toast } = useToast()
//   const limit = 1000000

//   useEffect(() => {
//     if (editorRef.current && aiOutput) {
//       editorRef.current.getInstance().setMarkdown(aiOutput)
//     }
//   }, [aiOutput])

//   const generateContent = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (totalUsage >= limit) {
//       toast({
//         title: "Usage limit exceeded",
//         description: "You have reached your usage limit. Please upgrade your plan.",
//         variant: "destructive",
//       })
//       return
//     }

//     setLoading(true)
//     setContentLoading(true)

//     try {
//       const { refinedPrompt, content } = await generateEnhancedContent(prompt)
//       setRefinedPrompt(refinedPrompt)
//       setAiOutput(content)

//       // Calculate credits used (random between 60-100 for demo)
//       const creditsUsed = Math.floor(Math.random() * (100 - 60 + 1) + 60)
//       setTotalUsage((prev: number) => prev + creditsUsed)

//       await saveOutputToDB(prompt, refinedPrompt, content)

//       setupdatecredit?.(Date.now())
//       toast({
//         title: "Content generated successfully!",
//         description: "Your custom content has been created using Gemini AI.",
//       })
//     } catch (error) {
//       console.error("Error generating AI content:", error)
//       toast({
//         title: "Generation failed",
//         description: "Failed to generate content. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//       setContentLoading(false)
//     }
//   }

//   const saveOutputToDB = async (originalPrompt: string, refinedPrompt: string, content: string) => {
//     try {
//       await db.insert(aioutput).values({
//         formdata: originalPrompt,
//         airesponse: content,
//         templateslug: 'custom',
//         createby: user?.primaryEmailAddress?.emailAddress || '',
//         createdat: moment().format('DD/MM/yyyy'),
//       })
//     } catch (error) {
//       console.error("Error saving output to the database:", error)
//       toast({
//         title: "Save failed",
//         description: "Failed to save output. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleCopy = () => {
//     navigator.clipboard.writeText(aiOutput)
//     toast({
//       title: "Copied to clipboard",
//       description: "The generated content has been copied to your clipboard.",
//     })
//   }

//   const handleReset = () => {
//     setPrompt('')
//     setAiOutput('')
//     setRefinedPrompt('')
//     if (editorRef.current) {
//       editorRef.current.getInstance().setMarkdown('')
//     }
//   }

//   const handleEdit = async () => {
//     const editPrompt = window.prompt("What changes would you like to make to the output?")
//     if (editPrompt) {
//       setContentLoading(true)
//       try {
//         const { content: editedContent } = await generateEnhancedContent(aiOutput + "\n\nEdit instructions: " + editPrompt)
//         setAiOutput(editedContent)
//         toast({
//           title: "Content updated successfully!",
//           description: "Your content has been edited based on your instructions.",
//         })
//       } catch (error) {
//         console.error("Error editing content:", error)
//         toast({
//           title: "Edit failed",
//           description: "Failed to edit content. Please try again.",
//           variant: "destructive",
//         })
//       } finally {
//         setContentLoading(false)
//       }
//     }
//   }

//   return (
//     <div className="p-4 md:p-10 bg-background min-h-screen">
//       <Link href="/dashboard">
//         <Button
//           variant="outline"
//           className={`mb-6 bg-gradient-to-r ${THEME.primary.gradient} hover:${THEME.primary.hover} text-white`}
//           style={{ cursor: 'url(/poin.png), auto' }}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
//         </Button>
//       </Link>
//       <Card className="max-w-5xl mx-auto border border-purple-100">
//         <CardHeader className={`bg-gradient-to-r ${THEME.primary.gradient}`}>
//           <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
//             <Image src='https://cdn-icons-png.flaticon.com/128/13963/13963247.png' alt="Custom Template" width={40} height={40} />
//             Custom Template Generator
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6 p-6">
//           <form onSubmit={generateContent} className="space-y-4">
//             <div>
//               <label htmlFor="prompt" className="block text-sm font-medium mb-1">Enter Your Prompt</label>
//               <Textarea 
//                 id="prompt"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 required 
//                 className={`min-h-[100px] border-2 ${THEME.primary.border} focus:ring-purple-400`}
//                 style={{ cursor: 'url(/type.png), auto' }}
//                 placeholder="Describe the content you want to generate..."
//               />
//             </div>
//             <Button
//               type="submit"
//               className={`w-full bg-gradient-to-r ${THEME.primary.gradient} hover:${THEME.primary.hover} text-white transition-all duration-300`}
//               disabled={loading || contentLoading || totalUsage > limit}
//               style={{ cursor: 'url(/poin.png), auto' }}
//             >
//               {loading ? <Loader2Icon className="animate-spin mr-2" /> : null}
//               {loading ? 'Generating...' : 'Generate Enhanced Content'}
//             </Button>
//           </form>

//           <div className="border-2 rounded-lg overflow-hidden bg-white border-purple-100">
//               <Editor
//                 ref={editorRef}
//                 initialValue={aiOutput || "Your enhanced content will appear here..."}
//                 height="400px"
//                 initialEditType="wysiwyg"
//                 useCommandShortcut={true}
//                 theme="light"
//                 toolbarItems={[
//                   ['heading', 'bold', 'italic', 'strike'],
//                   ['hr', 'quote'],
//                   ['ul', 'ol', 'task', 'indent', 'outdent'],
//                   ['table', 'image', 'link'],
//                   ['code', 'codeblock']
//                 ]}
//               />
//           </div>

//           <div className="flex flex-col md:flex-row gap-2">
//             <Button
//               onClick={handleCopy}
//               className={`flex-1 bg-gradient-to-r ${THEME.secondary.gradient} hover:${THEME.secondary.hover} ${THEME.secondary.text}`}
//               style={{ cursor: 'url(/poin.png), auto' }}
//               disabled={!aiOutput || contentLoading}
//             >
//               <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
//             </Button>
//             <Button
//               onClick={handleEdit}
//               className={`flex-1 bg-gradient-to-r ${THEME.accent.gradient} hover:${THEME.accent.hover} text-white`}
//               disabled={!aiOutput || contentLoading}
//               style={{ cursor: 'url(/poin.png), auto' }}
//             >
//               <Edit2 className="mr-2 h-4 w-4" /> Edit Output
//             </Button>
//             <Button
//               onClick={handleReset}
//               variant="outline"
//               className="flex-1"
//               style={{ cursor: 'url(/poin.png), auto' }}
//               disabled={contentLoading}
//             >
//               <RefreshCw className="mr-2 h-4 w-4" /> Reset
//             </Button>
//           </div>

//           {loading && (
//             <div className="flex justify-center items-center py-4">
//               <div className={`animate-spin rounded-full h-8 w-8 border-2 border-t-transparent ${THEME.primary.border}`} />
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default EnhancedCustomTemplateGenerator

'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2Icon, ArrowLeft, Copy, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateContext } from '@/app/(context)/UpdateContext'
import { db } from '@/utils/db'
import { aioutput } from '@/utils/schema'
import { generateEnhancedContent } from '@/utils/enhancedAIModel'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContext } from 'react'

function EnhancedCustomTemplateGenerator() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState('')
  const [refinedPrompt, setRefinedPrompt] = useState('')
  const { user } = useUser()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const editorRef = useRef<Editor>(null)
  const { toast } = useToast()
  const limit = 1000000

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(aiOutput)
    }
  }, [aiOutput])

  const generateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (totalUsage >= limit) {
      toast({
        title: "Usage limit exceeded",
        description: "You have reached your usage limit. Please upgrade your plan.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { refinedPrompt, content } = await generateEnhancedContent(prompt)
      setRefinedPrompt(refinedPrompt)
      setAiOutput(content)

      // Calculate credits used (random between 60-100 for demo)
      const creditsUsed = Math.floor(Math.random() * (100 - 60 + 1) + 60)
      setTotalUsage((prev: number) => prev + creditsUsed)

      await saveOutputToDB(prompt, refinedPrompt, content)

      setupdatecredit?.(Date.now())
      toast({
        title: "Content generated successfully!",
        description: "Your custom content has been created using Gemini AI.",
      })
    } catch (error) {
      console.error("Error generating AI content:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveOutputToDB = async (originalPrompt: string, refinedPrompt: string, content: string) => {
    try {
      await db.insert(aioutput).values({
        formdata: originalPrompt,
        airesponse: content,
        templateslug: 'custom',
        createby: user?.primaryEmailAddress?.emailAddress || '',
        createdat: moment().format('DD/MM/yyyy'),
        // refinedprompt: refinedPrompt, // Now storing the refined prompt
      })
    } catch (error) {
      console.error("Error saving output to the database:", error)
      toast({
        title: "Save failed",
        description: "Failed to save output. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput)
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard.",
    })
  }

  const handleReset = () => {
    setPrompt('')
    setAiOutput('')
    setRefinedPrompt('')
    editorRef.current?.getInstance().setMarkdown('')
  }

  return (
    <div className="p-4 md:p-10 bg-background min-h-screen">
      <Link href="/dashboard">
        <Button
          variant="outline"
          className="mb-6 bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim text-back"
          style={{ cursor: 'url(/poin.png), auto' }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <Image src='https://cdn-icons-png.flaticon.com/128/13963/13963247.png' alt="Custom Template" width={40} height={40} />
              Custom Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={generateContent} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium mb-1">Enter Your Prompt</label>
                <Textarea 
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required 
                  className="min-h-[100px]"
                  style={{ cursor: 'url(/type.png), auto' }}
                  placeholder="Describe the content you want to generate..."
                />
              </div>
              {/* {refinedPrompt && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Enhanced Prompt:</label>
                  <div className="p-3 bg-muted rounded-lg text-sm">
                    {refinedPrompt}
                  </div>
                </div>
              )} */}
              <Button
                type="submit"
                className="w-full bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim text-back"
                disabled={loading || totalUsage > limit}
                style={{ cursor: 'url(/poin.png), auto' }}
              >
                {loading ? <Loader2Icon className="animate-spin mr-2" /> : null}
                {loading ? 'Generating...' : 'Generate Enhanced Content'}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Your Enhanced Result
              <div className="space-x-2 flex justify-between items-center">
                <Button onClick={handleCopy} variant="outline" className='bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim text-back' style={{ cursor: 'url(/poin.png), auto' }}>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button onClick={handleReset} variant="outline" style={{ cursor: 'url(/poin.png), auto' }}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Editor
                ref={editorRef}
                initialValue={aiOutput || "Your enhanced content will appear here..."}
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EnhancedCustomTemplateGenerator