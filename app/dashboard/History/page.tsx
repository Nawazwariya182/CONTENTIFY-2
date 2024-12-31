'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader, ClipboardCopy, RefreshCcw, AlertCircle } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useUser } from '@clerk/nextjs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface HistoryItem {
  id: number
  templateslug: string
  airesponse: string
  createby: string
  createdat: string
  formdata: string
}

export default function History() {
  const { user, isLoaded: isUserLoaded } = useUser()
  const [historyData, setHistoryData] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchHistory = async (showToast = false) => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/history', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch history')
      }

      const data = await response.json()
      setHistoryData(data)
      setRetryCount(0)

      if (showToast) {
        toast({
          title: "Refreshed",
          description: "History has been updated",
        })
      }
    } catch (err) {
      console.error('Error fetching history:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to load history'
      setError(errorMessage)
      
      // Increment retry count and attempt retry if under threshold
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1)
        setTimeout(() => fetchHistory(), 2000 * (retryCount + 1))
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isUserLoaded && user) {
      fetchHistory()
    }
  }, [isUserLoaded, user])

  const handleRefresh = () => {
    fetchHistory(true)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied",
        description: "Content copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  if (!isUserLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <Card className="m-4">
        <CardContent className="p-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              Please sign in to view your history.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-4 mb-[100px]">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">History</h1>
              <p className="text-sm text-muted-foreground">Your generated content history</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchHistory()}
              className="ml-4"
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card className='mb-4'>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template</TableHead>
                <TableHead>AI Response</TableHead>
                {/* <TableHead>Date</TableHead> */}
                <TableHead>Copy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Loading history...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : historyData.length > 0 ? (
                historyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.templateslug}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate">
                        {item.airesponse.substring(0, 100)}
                        {item.airesponse.length > 100 && '...'}
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      {new Date(item.createdat).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell> */}
                    <TableCell>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(item.airesponse)}
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
                    <p>No history data available</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Generate some content to see it here
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* {process.env.NODE_ENV === 'development' && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Debug Info</h3>
            <pre className="text-xs bg-muted p-2 rounded overflow-auto">
              {JSON.stringify(
                {
                  userId: user.id,
                  itemsCount: historyData.length,
                  isLoading,
                  hasError: !!error,
                  retryCount,
                  lastError: error,
                },
                null,
                2
              )}
            </pre>
          </CardContent>
        </Card>
      )} */}
    </div>
  )
}

