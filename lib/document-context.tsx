"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DocumentContextType {
  documentTitle: string
  setDocumentTitle: (title: string) => void
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documentTitle, setDocumentTitle] = useState("Untitled")

  return <DocumentContext.Provider value={{ documentTitle, setDocumentTitle }}>{children}</DocumentContext.Provider>
}

export function useDocument() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider")
  }
  return context
}
