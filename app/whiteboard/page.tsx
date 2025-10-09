"use client"

import { useSearchParams } from "next/navigation"

export default function WhiteboardPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId") || "default-course"

  return (
    <div className="h-full bg-black flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Whiteboard View</h1>
        <p className="text-gray-400">Whiteboard functionality coming soon for course {courseId}</p>
      </div>
    </div>
  )
}
