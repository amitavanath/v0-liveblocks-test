"use client"
import { useState } from "react"
import { ChevronDown, ChevronRight, FileText, Plus, FolderPlus } from "lucide-react"
import { useUser } from "@/lib/user-context"

interface Document {
  id: string
  name: string
  type: "document" | "whiteboard" | "sheet"
}

interface Topic {
  id: string
  name: string
  documents: Document[]
}

interface Folder {
  id: string
  name: string
  topics: Topic[]
}

export function Sidebar() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["maths"]))
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(["maths-integers"]))
  const [selectedDoc, setSelectedDoc] = useState<string>("integers-doc")
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "maths",
      name: "Maths",
      topics: [
        {
          id: "maths-integers",
          name: "Integers",
          documents: [
            { id: "integers-doc", name: "Introduction", type: "document" },
            { id: "integers-sheet", name: "Practice Sheet", type: "sheet" },
          ],
        },
        {
          id: "maths-fractions",
          name: "Fractions",
          documents: [{ id: "fractions-doc", name: "Basics", type: "document" }],
        },
      ],
    },
    {
      id: "english",
      name: "English",
      topics: [
        {
          id: "english-grammar",
          name: "Grammar",
          documents: [{ id: "grammar-doc", name: "Rules", type: "document" }],
        },
      ],
    },
  ])
  const [showNewCourseInput, setShowNewCourseInput] = useState(false)
  const [newCourseName, setNewCourseName] = useState("")
  const [addingTopicToFolder, setAddingTopicToFolder] = useState<string | null>(null)
  const [newTopicName, setNewTopicName] = useState("")
  const [addingDocToTopic, setAddingDocToTopic] = useState<string | null>(null)
  const [newDocName, setNewDocName] = useState("")
  const [newDocType, setNewDocType] = useState<"document" | "whiteboard" | "sheet">("document")

  const { user } = useUser()
  const isTutor = user.role === "tutor"

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics)
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId)
    } else {
      newExpanded.add(topicId)
    }
    setExpandedTopics(newExpanded)
  }

  const handleAddCourse = () => {
    if (newCourseName.trim()) {
      const newFolder: Folder = {
        id: newCourseName.toLowerCase().replace(/\s+/g, "-"),
        name: newCourseName,
        topics: [],
      }
      setFolders([...folders, newFolder])
      setExpandedFolders(new Set([...expandedFolders, newFolder.id]))
      setNewCourseName("")
      setShowNewCourseInput(false)
    }
  }

  const handleAddTopic = (folderId: string) => {
    if (newTopicName.trim()) {
      const newTopic: Topic = {
        id: `${folderId}-${newTopicName.toLowerCase().replace(/\s+/g, "-")}`,
        name: newTopicName,
        documents: [],
      }
      setFolders(
        folders.map((folder) =>
          folder.id === folderId ? { ...folder, topics: [...folder.topics, newTopic] } : folder,
        ),
      )
      setExpandedTopics(new Set([...expandedTopics, newTopic.id]))
      setNewTopicName("")
      setAddingTopicToFolder(null)
    }
  }

  const handleAddDocument = (folderId: string, topicId: string) => {
    if (newDocName.trim()) {
      const newDoc: Document = {
        id: `${topicId}-${newDocName.toLowerCase().replace(/\s+/g, "-")}`,
        name: newDocName,
        type: newDocType,
      }
      setFolders(
        folders.map((folder) =>
          folder.id === folderId
            ? {
                ...folder,
                topics: folder.topics.map((topic) =>
                  topic.id === topicId ? { ...topic, documents: [...topic.documents, newDoc] } : topic,
                ),
              }
            : folder,
        ),
      )
      setNewDocName("")
      setNewDocType("document")
      setAddingDocToTopic(null)
    }
  }

  const getDocIcon = (type: string) => {
    switch (type) {
      case "whiteboard":
        return "🎨"
      case "sheet":
        return "📊"
      default:
        return <FileText className="w-4 h-4" />
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
        {isTutor && (
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
              </div>
            )}
          </div>
        )}

        {folders.map((folder) => {
          const isFolderExpanded = expandedFolders.has(folder.id)
          return (
            <div key={folder.id} className="mb-2">
              <div className="flex items-center gap-1 px-4">
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="flex-1 flex items-center gap-2 py-2 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors rounded"
                >
                  {isFolderExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">{folder.name}</span>
                </button>
                {isFolderExpanded && isTutor && (
                  <button
                    onClick={() => setAddingTopicToFolder(folder.id)}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-900 rounded transition-colors"
                    title="Add topic"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isFolderExpanded && (
                <div className="ml-2">
                  {addingTopicToFolder === folder.id && (
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        value={newTopicName}
                        onChange={(e) => setNewTopicName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddTopic(folder.id)
                          if (e.key === "Escape") {
                            setAddingTopicToFolder(null)
                            setNewTopicName("")
                          }
                        }}
                        placeholder="Topic name..."
                        className="w-full px-2 py-1 text-sm bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-gray-600"
                        autoFocus
                      />
                    </div>
                  )}

                  {folder.topics.map((topic) => {
                    const isTopicExpanded = expandedTopics.has(topic.id)
                    return (
                      <div key={topic.id} className="ml-2">
                        <div className="flex items-center gap-1 px-4">
                          <button
                            onClick={() => toggleTopic(topic.id)}
                            className="flex-1 flex items-center gap-2 py-2 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors rounded text-sm"
                          >
                            {isTopicExpanded ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                            <span>{topic.name}</span>
                          </button>
                          {isTopicExpanded && isTutor && (
                            <button
                              onClick={() => setAddingDocToTopic(topic.id)}
                              className="p-1 text-gray-400 hover:text-white hover:bg-gray-900 rounded transition-colors"
                              title="Add page"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {isTopicExpanded && (
                          <div className="ml-4">
                            {addingDocToTopic === topic.id && (
                              <div className="px-4 py-2 space-y-2">
                                <input
                                  type="text"
                                  value={newDocName}
                                  onChange={(e) => setNewDocName(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleAddDocument(folder.id, topic.id)
                                    if (e.key === "Escape") {
                                      setAddingDocToTopic(null)
                                      setNewDocName("")
                                    }
                                  }}
                                  placeholder="Page name..."
                                  className="w-full px-2 py-1 text-xs bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-gray-600"
                                  autoFocus
                                />
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => setNewDocType("document")}
                                    className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                                      newDocType === "document"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800 text-gray-400 hover:text-white"
                                    }`}
                                  >
                                    Doc
                                  </button>
                                  <button
                                    onClick={() => setNewDocType("whiteboard")}
                                    className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                                      newDocType === "whiteboard"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-800 text-gray-400 hover:text-white"
                                    }`}
                                  >
                                    Board
                                  </button>
                                  <button
                                    onClick={() => setNewDocType("sheet")}
                                    className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                                      newDocType === "sheet"
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-800 text-gray-400 hover:text-white"
                                    }`}
                                  >
                                    Sheet
                                  </button>
                                </div>
                              </div>
                            )}

                            {topic.documents.map((doc) => (
                              <button
                                key={doc.id}
                                onClick={() => setSelectedDoc(doc.id)}
                                className={`w-full flex items-center gap-2 px-4 py-2 text-xs transition-colors ${
                                  selectedDoc === doc.id
                                    ? "text-white bg-gray-900"
                                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                                }`}
                              >
                                {typeof getDocIcon(doc.type) === "string" ? (
                                  <span>{getDocIcon(doc.type)}</span>
                                ) : (
                                  getDocIcon(doc.type)
                                )}
                                <span className="truncate">{doc.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
          <div className="flex flex-col">
            <span className="text-white text-sm">{user.name}</span>
            <span className="text-xs text-gray-400 capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
