"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { Editor } from "@tiptap/react"
import { Sparkles, Type, Heading1, Heading2, Heading3, List, ListOrdered, Table, Quote, Code } from "lucide-react"

interface BlockMenuItem {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  shortcut?: string
  badge?: string
  action: (editor: Editor) => void
  category?: string
}

interface BlockMenuProps {
  editor: Editor
  position: { x: number; y: number }
  onClose: () => void
}

export function BlockMenu({ editor, position, onClose }: BlockMenuProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const menuItems: BlockMenuItem[] = [
    {
      id: "ai-meeting-notes",
      label: "AI Meeting Notes",
      icon: <Sparkles className="w-4 h-4" />,
      badge: "Beta",
      category: "AI",
      action: (editor) => {
        editor.commands.insertContent("<h2>Meeting Notes</h2><p>AI-generated meeting notes...</p>")
        onClose()
      },
    },
    {
      id: "ai-block",
      label: "AI Block",
      icon: <Sparkles className="w-4 h-4" />,
      badge: "New",
      category: "AI",
      action: (editor) => {
        editor.commands.insertContent("<p>AI-generated content...</p>")
        onClose()
      },
    },
    {
      id: "text",
      label: "Text",
      description: "Just start writing with plain text",
      icon: <Type className="w-4 h-4" />,
      category: "Basic blocks",
      action: (editor) => {
        editor.commands.insertContent("<p></p>")
        onClose()
      },
    },
    {
      id: "heading-1",
      label: "Heading 1",
      description: "Big section heading",
      icon: <Heading1 className="w-4 h-4" />,
      shortcut: "#",
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().setHeading({ level: 1 }).run()
        onClose()
      },
    },
    {
      id: "heading-2",
      label: "Heading 2",
      description: "Use this for key sections",
      icon: <Heading2 className="w-4 h-4" />,
      shortcut: "##",
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().setHeading({ level: 2 }).run()
        onClose()
      },
    },
    {
      id: "heading-3",
      label: "Heading 3",
      description: "Medium section heading",
      icon: <Heading3 className="w-4 h-4" />,
      shortcut: "###",
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().setHeading({ level: 3 }).run()
        onClose()
      },
    },
    {
      id: "bulleted-list",
      label: "Bulleted list",
      description: "Create a simple bulleted list",
      icon: <List className="w-4 h-4" />,
      shortcut: "-",
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().toggleBulletList().run()
        onClose()
      },
    },
    {
      id: "numbered-list",
      label: "Numbered list",
      description: "Create a list with numbering",
      icon: <ListOrdered className="w-4 h-4" />,
      shortcut: "1.",
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().toggleOrderedList().run()
        onClose()
      },
    },
    {
      id: "table",
      label: "Table",
      description: "Add a table to organize data",
      icon: <Table className="w-4 h-4" />,
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        onClose()
      },
    },
    {
      id: "quote",
      label: "Quote",
      description: "Capture a quote",
      icon: <Quote className="w-4 h-4" />,
      shortcut: ">",
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().toggleBlockquote().run()
        onClose()
      },
    },
    {
      id: "code",
      label: "Code",
      description: "Capture a code snippet",
      icon: <Code className="w-4 h-4" />,
      shortcut: "```",
      category: "Basic blocks",
      action: (editor) => {
        editor.chain().focus().toggleCodeBlock().run()
        onClose()
      },
    },
  ]

  const filteredItems = menuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()),
  )

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      const category = item.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, BlockMenuItem[]>,
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        const selectedItem = filteredItems[selectedIndex]
        if (selectedItem) {
          selectedItem.action(editor)
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, filteredItems, editor, onClose])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-50 w-96"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="max-h-96 overflow-y-auto">
        {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
          <div key={category}>
            {categoryIndex === 0 && items.some((item) => item.badge) && (
              <div className="px-3 py-2 border-b border-gray-700">
                {items
                  .filter((item) => item.badge)
                  .map((item, index) => {
                    const globalIndex = filteredItems.indexOf(item)
                    return (
                      <button
                        key={item.id}
                        onClick={() => item.action(editor)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                          selectedIndex === globalIndex ? "bg-[#3a3a3a]" : "hover:bg-[#333333]"
                        }`}
                      >
                        <div className="text-gray-400">{item.icon}</div>
                        <span className="text-sm text-gray-200">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto text-xs px-2 py-0.5 bg-blue-600 text-white rounded">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
              </div>
            )}

            {category === "Basic blocks" && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{category}</div>
                <div className="px-2 pb-2">
                  {items
                    .filter((item) => !item.badge)
                    .map((item) => {
                      const globalIndex = filteredItems.indexOf(item)
                      return (
                        <button
                          key={item.id}
                          onClick={() => item.action(editor)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            selectedIndex === globalIndex ? "bg-[#3a3a3a]" : "hover:bg-[#333333]"
                          }`}
                        >
                          <div className="text-gray-400 flex-shrink-0">{item.icon}</div>
                          <div className="flex-1 text-left">
                            <div className="text-sm text-gray-200">{item.label}</div>
                            {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
                          </div>
                          {item.shortcut && (
                            <span className="text-xs text-gray-500 font-mono flex-shrink-0">{item.shortcut}</span>
                          )}
                        </button>
                      )
                    })}
                </div>
              </>
            )}
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">No results found</div>
        )}
      </div>

      <div className="border-t border-gray-700 px-3 py-2 bg-[#252525]">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="type to filter..."
          className="w-full bg-transparent text-sm text-gray-400 placeholder-gray-600 outline-none"
        />
      </div>

      <div className="border-t border-gray-700 px-3 py-1.5 bg-[#252525] text-xs text-gray-600">
        Type '' on the page <span className="ml-2">esc</span>
      </div>
    </div>
  )
}
