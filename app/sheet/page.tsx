"use client"

import { Sidebar } from "@/components/Sidebar"
import { useSearchParams } from "next/navigation"

export default function SheetPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId") || "default-course"

  return (
    <div className="flex h-full bg-black">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Sheet View</h1>
          <p className="text-gray-400">Spreadsheet functionality coming soon for course {courseId}</p>
        </div>
      </div>
    </div>
  )
}
