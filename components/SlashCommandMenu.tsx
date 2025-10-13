"use client"

import type React from "react"

import { ReactRenderer } from "@tiptap/react"
import tippy, { type Instance as TippyInstance } from "tippy.js"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Heading1, Heading2, Heading3, List, ListOrdered, TableIcon, Quote, Code, FileText } from "lucide-react"

interface CommandItem {
  title: string
  description: string
  icon: React.ReactNode
  command: (props: any) => void
}

interface SlashCommandMenuProps {
  items: CommandItem[]
  command: (item: CommandItem) => void
}

export const SlashCommandMenu = forwardRef<any, SlashCommandMenuProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler()
        return true
      }

      if (event.key === "ArrowDown") {
        downHandler()
        return true
      }

      if (event.key === "Enter") {
        enterHandler()
        return true
      }

      return false
    },
  }))

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl overflow-hidden min-w-[320px]">
      <div className="max-h-[400px] overflow-y-auto">
        {props.items.length > 0 ? (
          props.items.map((item, index) => (
            <button
              key={index}
              onClick={() => selectItem(index)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                index === selectedIndex ? "bg-gray-800" : "hover:bg-gray-800/50"
              }`}
            >
              <div className="mt-0.5 text-gray-400">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">{item.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.description}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-400">No results</div>
        )}
      </div>
      {props.items.length > 0 && (
        <div className="border-t border-gray-700 px-4 py-2 text-xs text-gray-500">
          Use ↑↓ to navigate, Enter to select
        </div>
      )}
    </div>
  )
})

SlashCommandMenu.displayName = "SlashCommandMenu"

export const getSuggestionItems = ({ query, editor }: { query: string; editor: any }): CommandItem[] => {
  const items: CommandItem[] = [
    {
      title: "Heading 1",
      description: "Big section heading",
      icon: <Heading1 className="w-4 h-4" />,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      title: "Heading 2",
      description: "Medium section heading",
      icon: <Heading2 className="w-4 h-4" />,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      title: "Heading 3",
      description: "Small section heading",
      icon: <Heading3 className="w-4 h-4" />,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      title: "Bullet List",
      description: "Create a simple bullet list",
      icon: <List className="w-4 h-4" />,
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering",
      icon: <ListOrdered className="w-4 h-4" />,
      command: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      title: "Table",
      description: "Insert a table",
      icon: <TableIcon className="w-4 h-4" />,
      command: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      title: "Quote",
      description: "Capture a quote",
      icon: <Quote className="w-4 h-4" />,
      command: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      title: "Code Block",
      description: "Insert a code snippet",
      icon: <Code className="w-4 h-4" />,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      title: "Divider",
      description: "Visually divide blocks",
      icon: <FileText className="w-4 h-4" />,
      command: () => editor.chain().focus().setHorizontalRule().run(),
    },
  ]

  return items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
}

export const renderSlashMenu = () => {
  let component: ReactRenderer | null = null
  let popup: TippyInstance[] | null = null

  return {
    onStart: (props: any) => {
      component = new ReactRenderer(SlashCommandMenu, {
        props,
        editor: props.editor,
      })

      if (!props.clientRect) {
        return
      }

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      })
    },

    onUpdate(props: any) {
      component?.updateProps(props)

      if (!props.clientRect) {
        return
      }

      popup?.[0]?.setProps({
        getReferenceClientRect: props.clientRect,
      })
    },

    onKeyDown(props: any) {
      if (props.event.key === "Escape") {
        popup?.[0]?.hide()
        return true
      }

      return component?.ref?.onKeyDown(props)
    },

    onExit() {
      popup?.[0]?.destroy()
      component?.destroy()
    },
  }
}
