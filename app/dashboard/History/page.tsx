'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader, ClipboardCopy } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export interface HistoryItem {
  id: number
  templateslug: string
  airesponse: string
  createby: string
  createdAt: string
  formdata: string
}

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/history')
        if (!response.ok) {
          throw new Error('Failed to fetch history data')
        }
        const data = await response.json()
        setHistoryData(data)
      } catch (error) {
        setError('Error fetching data. Please try again later.')
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const cleanAIResponse = (response: string) => {
    const cleanedResponse = response.replace(/[#`*]/g, '').trim()
    return cleanedResponse.length > 100 ? `${cleanedResponse.slice(0, 100)}...` : cleanedResponse
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The AI response has been copied to your clipboard.",
    })
  }

  return (
    <div className="p-4 bg-back min-h-screen text-text">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-2">History</h1>
          <p className="text-sm text-text/70">Search your previously generated AI content</p>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-6 bg-red-100">
          <CardContent className="py-3 text-red-700">{error}</CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-second">
              <TableRow>
                <TableHead className="text-acc font-semibold">Template</TableHead>
                <TableHead className="text-text font-semibold">AI Response</TableHead>
                <TableHead className="text-text font-semibold">Words</TableHead>
                <TableHead className="text-text font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader className="mx-auto animate-spin" />
                  </TableCell>
                </TableRow>
              ) : historyData.length > 0 ? (
                historyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-prim">{item.templateslug}</TableCell>
                    <TableCell>{cleanAIResponse(item.airesponse)}</TableCell>
                    <TableCell>{item.airesponse.split(' ').length}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-prim text-back hover:bg-acc hover:text-back"
                        onClick={() => copyToClipboard(item.airesponse)}
                        style={{ cursor: 'url(/poin.png), auto' }}
                      >
                        <ClipboardCopy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No history data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default History