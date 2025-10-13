"use client"

import { GripVertical } from "lucide-react"
import { useState } from "react"

interface DragHandleProps {
  editor: any
}

export function DragHandle({ editor }: DragHandleProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div
      className="drag-handle opacity-0 group-hover:opacity-100 transition-opacity absolute -left-8 top-0 cursor-grab active:cursor-grabbing"
      contentEditable={false}
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <GripVertical className="w-5 h-5 text-gray-600 hover:text-gray-400" />
    </div>
  )
}
