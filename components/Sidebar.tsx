"use client"
import { useState } from "react"
import { ChevronDown, ChevronRight, FileText } from "lucide-react"

interface Document {
  id: string
  name: string
}

interface Folder {
  id: string
  name: string
  documents: Document[]
}

export function Sidebar() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["recent"]))
  const [selectedDoc, setSelectedDoc] = useState<string>("manifesto")

  const folders: Folder[] = [
    {
      id: "maths",
      name: "Maths",
      documents: [
        { id: "integers", name: "Integers" },
        { id: "fractions", name: "Fractions" },
        { id: "algebra", name: "Algebra" },
      ],
    },
    {
      id: "english",
      name: "English",
      documents: [
        { id: "grammar", name: "Grammar" },
        { id: "persuasive-writing", name: "Persuasive Writing" },
      ],
    },
    {
      id: "archive",
      name: "Archive",
      documents: [{ id: "old-docs", name: "Old Documents" }],
    },
  ]

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  return (
    <div className="w-48 bg-black border-r border-gray-800 flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded" />
          <span className="text-white font-semibold">Course Topics</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {folders.map((folder) => {
          const isExpanded = expandedFolders.has(folder.id)
          return (
            <div key={folder.id} className="mb-2">
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <span className="text-sm font-medium">{folder.name}</span>
              </button>
              {isExpanded && (
                <div className="ml-2">
                  {folder.documents.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc.id)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        selectedDoc === doc.id
                          ? "text-white bg-gray-900"
                          : "text-gray-400 hover:text-white hover:bg-gray-900"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{doc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
          <span className="text-white text-sm">Stacy</span>
        </div>
      </div>
    </div>
  )
}
