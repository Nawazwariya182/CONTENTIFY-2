'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function HistoryDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runDebugCheck = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/history')
      const data = await response.json()
      setDebugInfo({
        status: response.status,
        ok: response.ok,
        data: data,
        headers: Object.fromEntries(response.headers.entries())
      })
    } catch (error) {
      setDebugInfo({
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            onClick={runDebugCheck} 
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? 'Running Debug...' : 'Run Debug Check'}
          </Button>
        </div>
        {debugInfo && (
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}

