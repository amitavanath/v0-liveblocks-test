"use client"

import { Plus, GripVertical } from "lucide-react"
import type { Editor } from "@tiptap/react"

interface BlockControlsProps {
  editor: Editor
  onAddBlock?: () => void
}

export function BlockControls({ editor, onAddBlock }: BlockControlsProps) {
  return (
    <div className="absolute -left-12 top-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onAddBlock}
        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-400 hover:bg-gray-800 rounded transition-colors"
        contentEditable={false}
      >
        <Plus className="w-4 h-4" />
      </button>

      <button
        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-400 hover:bg-gray-800 rounded transition-colors cursor-grab active:cursor-grabbing"
        contentEditable={false}
        draggable
      >
        <GripVertical className="w-4 h-4" />
      </button>
    </div>
  )
}
