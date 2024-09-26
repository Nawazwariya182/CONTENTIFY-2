'use client'

import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { Copy, FileDown } from 'lucide-react'
import jsPDF from 'jspdf'
import { Document, Packer, Paragraph } from 'docx'
import { saveAs } from 'file-saver'

interface Props {
  aioutput: string
}

function OutputSection({ aioutput }: Props) {
  const editorRef = useRef<Editor>(null)

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance()
    editorInstance?.setMarkdown(aioutput)
  }, [aioutput])

  // const exportPDF = () => {
  //   const doc = new jsPDF()
  //   doc.text(editorRef.current?.getInstance().getMarkdown() || '', 10, 10)
  //   doc.save('document.pdf')
  // }

  const exportDOCX = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: editorRef.current?.getInstance().getMarkdown() || '',
            }),
          ],
        },
      ],
    })

    Packer.toBlob(doc).then((blob:any) => {
      saveAs(blob, 'document.docx')
    })
  }

  const exportHTML = () => {
    const htmlContent = editorRef.current?.getInstance().getHTML() || ''
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    saveAs(blob, 'document.html')
  }

  const exportTXT = () => {
    const textContent = editorRef.current?.getInstance().getMarkdown() || ''
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'document.txt')
  }

  return (
    <div className="bg-secondary shadow-lg border font-p">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-bold text-primary">Your result</h2>
        <div className="flex gap-2">
          <Button
            className="bg-primary text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all flex gap-2"
            onClick={() => navigator.clipboard.writeText(aioutput)}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
          {/* <Button
            className="bg-primary text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all flex gap-2"
            onClick={exportPDF}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <FileDown className="w-4 h-4" />
            PDF
          </Button> */}
          <Button
            className="bg-primary text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all flex gap-2"
            onClick={exportDOCX}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <FileDown className="w-4 h-4" />
            DOCX
          </Button>
          <Button
            className="bg-primary text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all flex gap-2"
            onClick={exportHTML}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <FileDown className="w-4 h-4" />
            HTML
          </Button>
          <Button
            className="bg-primary text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all flex gap-2"
            onClick={exportTXT}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <FileDown className="w-4 h-4" />
            TXT
          </Button>
        </div>
      </div>
      <div className="font-p">
        <Editor
          ref={editorRef}
          initialValue="Your Result Will Appear Here!"
          height="450px"
          initialEditType="wysiwyg"
          style={{ cursor: 'url(/poin.png), auto' }}
          useCommandShortcut={true}
        />
      </div>
    </div>
  )
}

export default OutputSection