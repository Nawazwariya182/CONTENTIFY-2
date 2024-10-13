'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from 'react-hot-toast'
import { summarizeText } from '@/utils/summary'

export default function TextSummarizationUI() {
  const [inputText, setInputText] = useState('')
  const [summary, setSummary] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to summarize')
      return
    }

    setIsProcessing(true)

    try {
      const result = await summarizeText(inputText)
      setSummary(result)
      toast.success('Text summarized successfully!')
    } catch (error) {
      console.error('Error in text summarization:', error)
      toast.error(`Failed to summarize text: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Text Summarization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Input Text</h3>
          <Textarea
            value={inputText}
            onChange={handleTextInput}
            placeholder="Enter the text you want to summarize"
            rows={6}
            className="w-full p-2 border rounded"
          />
        </div>

        <Button
          onClick={handleSummarize}
          disabled={isProcessing || !inputText.trim()}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            'Summarize'
          )}
        </Button>

        {summary && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Summary</h3>
            <Textarea
              value={summary}
              readOnly
              rows={4}
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}