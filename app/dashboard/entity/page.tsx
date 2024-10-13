// 'use client'

// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Loader2Icon } from "lucide-react"
// import { toast } from 'react-hot-toast'
// import { extractEntities } from '@/utils/entity'

// export default function EntityLinkingComponent() {
//   const [inputText, setInputText] = useState('')
//   const [entities, setEntities] = useState<string[]>([])
//   const [entityLinks, setEntityLinks] = useState<Record<string, string>>({})
//   const [isProcessing, setIsProcessing] = useState(false)

// const handleExtractEntities = async () => {
//   if (!inputText.trim()) {
//     toast.error("Please enter some text to analyze")
//     return
//   }

//   setIsProcessing(true)
//   try {
//     const extractedEntities = await extractEntities(inputText)
//     setEntities(extractedEntities)
    
//     if (extractedEntities.length > 0) {
//       const links = await getWikipediaLinks(extractedEntities)
//       setEntityLinks(links)
//       toast.success("Entities extracted and linked successfully")
//     }
//   } catch (error) {
//     console.error("Error in entity linking process:", error)
//     toast.error("Failed to process the text. Please try again.")
//   } finally {
//     setIsProcessing(false)
//   }
// }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
//         <div className="bg-gray-800 text-white p-6">
//           <h2 className="text-3xl font-bold mb-2">AI Entity Linker</h2>
//           <p className="text-sm opacity-80">Extract entities and find their Wikipedia links</p>
//         </div>
//         <div className="p-6 space-y-6">
//           <div>
//             <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
//               Input Text
//             </label>
//             <Textarea
//               id="inputText"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               placeholder="Enter text to extract entities from..."
//               rows={6}
//               className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none text-lg"
//             />
//           </div>
//           <div className="flex justify-center">
//             <Button
//               onClick={handleExtractEntities}
//               disabled={isProcessing || !inputText.trim()}
//               className="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//             >
//               {isProcessing ? (
//                 <>
//                   <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 'Extract Entities'
//               )}
//             </Button>
//           </div>
//           {entities.length > 0 && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Extracted Entities:</h3>
//               <ul className="space-y-2">
//                 {entities.map((entity, index) => (
//                   <li key={index} className="flex items-center space-x-2">
//                     <span className="font-medium">{entity}:</span>
//                     {entityLinks[entity] ? (
//                       <a
//                         href={entityLinks[entity]}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline"
//                       >
//                         Wikipedia Link
//                       </a>
//                     ) : (
//                       <span className="text-gray-500">No Wikipedia link found</span>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon } from "lucide-react"
import { toast } from 'react-hot-toast'
import { extractEntities, getWikipediaLinks } from '@/utils/entity'

export default function EntityLinkingComponent() {
  const [inputText, setInputText] = useState('')
  const [entities, setEntities] = useState<string[]>([])
  const [entityLinks, setEntityLinks] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleExtractEntities = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to analyze")
      return
    }

    setIsProcessing(true)
    try {
      // Extract entities from the input text
      const extractedEntities = await extractEntities(inputText)
      setEntities(extractedEntities)
      
      // If entities were extracted, generate their Wikipedia links
      if (extractedEntities.length > 0) {
        const links = getWikipediaLinks(extractedEntities)
        setEntityLinks(links)
        toast.success("Entities extracted and linked successfully")
      } else {
        toast.error("No entities found in the text.")
      }
    } catch (error) {
      console.error("Error in entity linking process:", error)
      toast.error("Failed to process the text. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-3xl font-bold mb-2">AI Entity Linker</h2>
          <p className="text-sm opacity-80">Extract entities and find their Wikipedia links</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
              Input Text
            </label>
            <Textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to extract entities from..."
              rows={6}
              className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none text-lg"
            />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleExtractEntities}
              disabled={isProcessing || !inputText.trim()}
              className="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Extract Entities'
              )}
            </Button>
          </div>
          {entities.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Extracted Entities:</h3>
              <ul className="space-y-2">
                {entities.map((entity, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="font-medium">{entity}:</span>
                    {entityLinks[entity] ? (
                      <a
                        href={entityLinks[entity]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
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
