"use client"
import { useState } from "react"
import { ChevronDown, ChevronRight, FileText, Plus, FolderPlus } from "lucide-react"

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
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["maths"]))
  const [selectedDoc, setSelectedDoc] = useState<string>("integers")
  const [folders, setFolders] = useState<Folder[]>([
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
  ])
  const [showNewCourseInput, setShowNewCourseInput] = useState(false)
  const [newCourseName, setNewCourseName] = useState("")
  const [addingDocToFolder, setAddingDocToFolder] = useState<string | null>(null)
  const [newDocName, setNewDocName] = useState("")

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleAddCourse = () => {
    if (newCourseName.trim()) {
      const newFolder: Folder = {
        id: newCourseName.toLowerCase().replace(/\s+/g, "-"),
        name: newCourseName,
        documents: [],
      }
      setFolders([...folders, newFolder])
      setExpandedFolders(new Set([...expandedFolders, newFolder.id]))
      setNewCourseName("")
      setShowNewCourseInput(false)
    }
  }

  const handleAddDocument = (folderId: string) => {
    if (newDocName.trim()) {
      const newDoc: Document = {
        id: `${folderId}-${newDocName.toLowerCase().replace(/\s+/g, "-")}`,
        name: newDocName,
      }
      setFolders(
        folders.map((folder) =>
          folder.id === folderId ? { ...folder, documents: [...folder.documents, newDoc] } : folder,
        ),
      )
      setNewDocName("")
      setAddingDocToFolder(null)
    }
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
        <div className="px-4 mb-4">
          {!showNewCourseInput ? (
            <button
              onClick={() => setShowNewCourseInput(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-900 rounded transition-colors"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCourse()
                  if (e.key === "Escape") {
                    setShowNewCourseInput(false)
                    setNewCourseName("")
                  }
                }}
                placeholder="Course name..."
                className="w-full px-3 py-2 text-sm bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-gray-600"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCourse}
                  className="flex-1 px-3 py-1 text-xs bg-white text-black rounded hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowNewCourseInput(false)
                    setNewCourseName("")
                  }}
                  className="flex-1 px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {folders.map((folder) => {
          const isExpanded = expandedFolders.has(folder.id)
          return (
            <div key={folder.id} className="mb-2">
              <div className="flex items-center gap-1 px-4">
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="flex-1 flex items-center gap-2 py-2 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors rounded"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">{folder.name}</span>
                </button>
                {isExpanded && (
                  <button
                    onClick={() => setAddingDocToFolder(folder.id)}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-900 rounded transition-colors"
                    title="Add document"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
              {isExpanded && (
                <div className="ml-2">
                  {addingDocToFolder === folder.id && (
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddDocument(folder.id)
                          if (e.key === "Escape") {
                            setAddingDocToFolder(null)
                            setNewDocName("")
                          }
                        }}
                        placeholder="Document name..."
                        className="w-full px-2 py-1 text-sm bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-gray-600"
                        autoFocus
                      />
                    </div>
                  )}
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
