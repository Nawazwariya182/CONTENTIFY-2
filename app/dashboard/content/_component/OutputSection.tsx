/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
"use client"

import { useEffect, useRef, useState } from "react"
import "@toast-ui/editor/dist/toastui-editor.css"
import { Editor } from "@toast-ui/react-editor"
import { Button } from "@/components/ui/button"
import { Copy, FileText, Download, FileType } from "lucide-react"
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
  PageNumber,
  Header,
  AlignmentType,
  HeadingLevel,
  convertInchesToTwip,
  Footer,
} from "docx"
import { saveAs } from "file-saver"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Props {
  aioutput: string
  templateName?: string
}

function OutputSection({ aioutput, templateName = "Document" }: Props) {
  const editorRef = useRef<Editor>(null)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance()
    editorInstance?.setMarkdown(aioutput)
  }, [aioutput])

  // Helper function to clean content (remove asterisks)
  const cleanContent = (content: string): string => {
    return content.replace(/\*/g, "")
  }

  // Helper function to process headings for bold formatting
  const processHeadings = (content: string): string => {
    // Make headings bold by ensuring they have proper markdown formatting
    const headingRegex = /^(#{1,6})\s+(.*?)$/gm
    return content.replace(headingRegex, (match, hashes, text) => {
      return `${hashes} **${text.trim()}**`
    })
  }

  const exportPDF = () => {
    setIsExporting(true)
    try {
      const content = cleanContent(editorRef.current?.getInstance().getMarkdown() || "")
      const processedContent = processHeadings(content)

      // Create PDF document
      const doc = new jsPDF()

      // Set font to Poppins
      doc.setFont("poppins") // Using Helvetica as fallback since Poppins may not be available in jsPDF

      // Add header
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text("Contentify", 14, 10)
      doc.text(templateName, doc.internal.pageSize.width - 14, 10, { align: "right" })

      // Add 2.5-point border (approximately 0.035 inches)
      const pageWidth = doc.internal.pageSize.width
      const pageHeight = doc.internal.pageSize.height
      const margin = 14
      const borderWidth = 0.5

      doc.setLineWidth(borderWidth)
      doc.rect(
        margin - borderWidth / 2,
        margin - borderWidth / 2,
        pageWidth - 2 * margin + borderWidth,
        pageHeight - 2 * margin + borderWidth,
      )

      // Add content
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)

      // Split content into lines and add to PDF with proper formatting
      const lines = processedContent.split("\n")
      let y = 25

      lines.forEach((line) => {
        // Check if line is a heading
        if (line.startsWith("#")) {
          const level = line.match(/^#+/)?.[0]?.length || 1
          const text = line.replace(/^#+\s+/, "").replace(/\*\*/g, "")

          // Set font size based on heading level
          const fontSize = 20 - level * 2
          doc.setFontSize(fontSize)
          doc.setFont("Helvetica", "bold")

          // Add some space before headings
          y += 5
          doc.text(text, margin, y)
          y += fontSize / 2

          // Reset font
          doc.setFontSize(12)
          doc.setFont("Helvetica", "normal")
        } else {
          // Regular text
          if (line.trim() !== "") {
            const textLines = doc.splitTextToSize(line, pageWidth - 2 * margin - 10)
            textLines.forEach((textLine: string) => {
              // Check if we need a new page
              if (y > pageHeight - 30) {
                doc.addPage()
                // Add header to new page
                doc.setFontSize(10)
                doc.setTextColor(100, 100, 100)
                doc.text("Contentify", 14, 10)
                doc.text(templateName, doc.internal.pageSize.width - 14, 10, { align: "right" })

                // Add border to new page
                doc.setLineWidth(borderWidth)
                doc.rect(
                  margin - borderWidth / 2,
                  margin - borderWidth / 2,
                  pageWidth - 2 * margin + borderWidth,
                  pageHeight - 2 * margin + borderWidth,
                )

                doc.setFontSize(12)
                doc.setTextColor(0, 0, 0)
                y = 25
              }

              doc.text(textLine, margin, y)
              y += 7
            })
          } else {
            y += 4 // Space for empty lines
          }
        }
      })

      // Add page numbers at the bottom left
      const totalPages = doc.internal.pages.length - 1
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        doc.text(`Page ${i} of ${totalPages}`, margin, pageHeight - 10)
      }

      // Save the PDF
      doc.save(`${templateName.replace(/\s+/g, "_")}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportDOCX = () => {
    setIsExporting(true)
    try {
      const content = cleanContent(editorRef.current?.getInstance().getMarkdown() || "")
      const processedContent = processHeadings(content)

      // Parse the markdown content to create structured DOCX
      const lines = processedContent.split("\n")
      const docxParagraphs: Paragraph[] = []

      // Add header
      const header = new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Contentify", bold: true }),
              new TextRun({ text: "                                                                  " }),
              new TextRun({ text: templateName, bold: true }),
            ],
          }),
        ],
      })

      // Process content
      lines.forEach((line) => {
        if (line.startsWith("#")) {
          // Handle headings
          const level = line.match(/^#+/)?.[0]?.length || 1
          const text = line.replace(/^#+\s+/, "").replace(/\*\*/g, "")

          docxParagraphs.push(
            new Paragraph({
              text: text,
              heading: `Heading${level}` as "Heading1" | "Heading2" | "Heading3" | "Heading4" | "Heading5" | "Heading6",
              style: "strong",
            }),
          )
        } else if (line.trim() !== "") {
          // Regular paragraph
          docxParagraphs.push(
            new Paragraph({
              children: [new TextRun({ text: line })],
              border: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
            }),
          )
        } else {
          // Empty line
          docxParagraphs.push(new Paragraph({}))
        }
      })

      // Create footer with page numbers
      const footer = new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                children: ["Page ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES],
                size: 20,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
        ],
      })

      // Create document with 2.5-point border
      const doc = new Document({
        styles: {
          paragraphStyles: [
            {
              id: "Normal",
              name: "Normal",
              run: {
                font: "Poppins",
              },
            },
          ],
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: convertInchesToTwip(1),
                  right: convertInchesToTwip(1),
                  bottom: convertInchesToTwip(1),
                  left: convertInchesToTwip(1),
                },
                borders: {
                  pageBorderTop: {
                    style: BorderStyle.SINGLE,
                    size: 25, // 2.5 points
                    color: "000000",
                  },
                  pageBorderRight: {
                    style: BorderStyle.SINGLE,
                    size: 25,
                    color: "000000",
                  },
                  pageBorderBottom: {
                    style: BorderStyle.SINGLE,
                    size: 25,
                    color: "000000",
                  },
                  pageBorderLeft: {
                    style: BorderStyle.SINGLE,
                    size: 25,
                    color: "000000",
                  },
                },
              },
            },
            headers: {
              default: header,
            },
            footers: {
              default: footer,
            },
            children: docxParagraphs,
          },
        ],
      })

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${templateName.replace(/\s+/g, "_")}.docx`)
        setIsExporting(false)
      })
    } catch (error) {
      console.error("Error generating DOCX:", error)
      setIsExporting(false)
    }
  }

  const exportHTML = () => {
    setIsExporting(true)
    try {
      let htmlContent = editorRef.current?.getInstance().getHTML() || ""

      // Clean content (remove asterisks)
      htmlContent = cleanContent(htmlContent)

      // Add CSS for styling
      const styledHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${templateName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            body {
              font-family: 'Poppins', sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            .document {
              max-width: 800px;
              margin: 0 auto;
              border: 2.5pt solid #000;
              padding: 20px;
              position: relative;
            }
            .header {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
              margin-bottom: 20px;
              color: #666;
            }
            h1, h2, h3, h4, h5, h6 {
              font-weight: bold;
              color: #222;
            }
            p {
              line-height: 1.6;
            }
            .footer {
              margin-top: 30px;
              border-top: 1px solid #eee;
              padding-top: 10px;
              color: #666;
              font-size: 0.8em;
            }
          </style>
        </head>
        <body>
          <div class="document">
            <div class="header">
              <div>Contentify</div>
              <div>${templateName}</div>
            </div>
            ${htmlContent}
            <div class="footer">
              <div>Page 1</div>
            </div>
          </div>
        </body>
        </html>
      `

      const blob = new Blob([styledHTML], { type: "text/html;charset=utf-8" })
      saveAs(blob, `${templateName.replace(/\s+/g, "_")}.html`)
    } catch (error) {
      console.error("Error generating HTML:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportTXT = () => {
    setIsExporting(true)
    try {
      let textContent = editorRef.current?.getInstance().getMarkdown() || ""

      // Clean content (remove asterisks)
      textContent = cleanContent(textContent)

      // Add simple header
      const formattedText = `CONTENTIFY - ${templateName}
=================================

${textContent}

=================================
Generated with Contentify`

      const blob = new Blob([formattedText], { type: "text/plain;charset=utf-8" })
      saveAs(blob, `${templateName.replace(/\s+/g, "_")}.txt`)
    } catch (error) {
      console.error("Error generating TXT:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="bg-second shadow-lg border font-p">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-bold text-[var(--prim)]">Your result</h2>
        <div className="flex gap-2">
          <Button
            className="bg-prim text-back hover:bg-white hover:text-prim hover:border-2 hover:border-prim transition-all flex gap-2"
            onClick={() => navigator.clipboard.writeText(aioutput)}
            style={{ cursor: "url(/poin.png), auto" }}
          >
            <Copy className="w-4 h-4 text-back hover:text-prim" />
            Copy
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-prim text-back hover:bg-white hover:text-prim hover:border-2 hover:border-prim transition-all flex gap-2"
                style={{ cursor: "url(/poin.png), auto" }}
                disabled={isExporting}
              >
                <Download className="w-4 h-4 text-back hover:text-prim" />
                {isExporting ? "Exporting..." : "Export"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportPDF} disabled={isExporting}>
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportDOCX} disabled={isExporting}>
                <FileText className="w-4 h-4 mr-2" />
                DOCX
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportHTML} disabled={isExporting}>
                <FileType className="w-4 h-4 mr-2" />
                HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportTXT} disabled={isExporting}>
                <FileType className="w-4 h-4 mr-2" />
                TXT
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="font-p">
        <Editor
          ref={editorRef}
          initialValue="Your Result Will Appear Here!"
          height="450px"
          initialEditType="wysiwyg"
          style={{ cursor: "url(/poin.png), auto" }}
          useCommandShortcut={true}
        />
      </div>
    </div>
  )
}

export default OutputSection
