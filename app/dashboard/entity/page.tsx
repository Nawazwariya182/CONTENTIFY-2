'use client'

import React, { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2Icon } from "lucide-react"
import { toast } from 'react-hot-toast'
import { extractEntities, sortEntities, getWikipediaLinks } from '@/utils/entity'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateContext } from '@/app/(context)/UpdateContext'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { entityLinking } from '@/utils/schemas/entitylinkingschema'

const entityTypes = [
  { value: 'all', label: 'All Entities' },
  { value: 'person', label: 'Person' },
  { value: 'organization', label: 'Organization' },
  { value: 'location', label: 'Location' },
  { value: 'event', label: 'Event' },
  { value: 'product', label: 'Product' },
]

export default function EnhancedEntityLinkingComponent() {
  const [inputText, setInputText] = useState('')
  const [entityType, setEntityType] = useState('all')
  const [entities, setEntities] = useState<string[]>([])
  const [entityLinks, setEntityLinks] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setupdatecredit } = useContext(UpdateContext)
  const { user } = useUser()

  const handleExtractEntities = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to analyze")
      return
    }

    const creditsNeeded = Math.floor(Math.random() * (100 - 60 + 1) + 60)

    if (totalUsage + creditsNeeded > 100000) {
      toast.error("Not enough credits for entity extraction")
      return
    }

    setIsProcessing(true)
    try {
      // Extract entities from the input text
      const extractedEntities = await extractEntities(inputText)
      
      // Sort entities using Gemini 1.5
      const sortedEntities = await sortEntities(extractedEntities, entityType)
      setEntities(sortedEntities)
      
      // Generate Wikipedia links for the sorted entities
      if (sortedEntities.length > 0) {
        const links = await getWikipediaLinks(sortedEntities)
        setEntityLinks(links)
        
        // Save entities to the database
        await saveEntitiesToDB(inputText, sortedEntities, links)
        
        // Update credit usage
        setTotalUsage((prevUsage: number) => prevUsage + creditsNeeded)
        setupdatecredit?.(Date.now())
        
        toast.success("Entities extracted, sorted, and linked successfully")
      } else {
        // toast.info("No entities found in the text.")
      }
    } catch (error) {
      console.error("Error in entity linking process:", error)
      toast.error("Failed to process the text. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const saveEntitiesToDB = async (text: string, entities: string[], links: Record<string, string>) => {
    if (!user?.id) return

    try {
      await db.insert(entityLinking).values({
        userId: user.id,
        inputText: text,
        entities: JSON.stringify(entities),
        entityLinks: JSON.stringify(links),
        entityType,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error saving entities to DB:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h2 className="text-3xl font-bold mb-2">AI Entity Linker</h2>
          <p className="text-sm opacity-80">Extract, sort, and link entities with advanced AI</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <Textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to extract entities from..."
                rows={6}
                style={{ cursor: 'url(/type.png), auto' }}
                className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="w-64">
              <label htmlFor="entityType" className="block text-sm font-medium text-gray-700 mb-2">
                Entity Type
              </label>
              <Select value={entityType} onValueChange={setEntityType}>
                <SelectTrigger id="entityType" style={{ cursor: 'url(/poin.png), auto' }}>
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent style={{ cursor: 'url(/poin.png), auto' }}>
                  {entityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}style={{ cursor: 'url(/poin.png), auto' }} >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleExtractEntities}
              disabled={isProcessing || !inputText.trim()}
              className="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              style={{ cursor: 'url(/poin.png), auto' }}
            >
              {isProcessing ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Extract and Link Entities'
              )}
            </Button>
          </div>
          {entities.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Extracted and Sorted Entities:</h3>
              <ul className="space-y-2">
                {entities.map((entity, index) => (
                  <li key={index} className="flex items-center space-x-2 p-2 bg-white rounded-md shadow">
                    <span className="font-medium text-gray-800">{entity}:</span>
                    {entityLinks[entity] ? (
                      <a
                        href={entityLinks[entity]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        style={{ cursor: 'url(/poin.png), auto' }}
                      >
                        Wikipedia Link
                      </a>
                    ) : (
                      <span className="text-gray-500">No Wikipedia link found</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}