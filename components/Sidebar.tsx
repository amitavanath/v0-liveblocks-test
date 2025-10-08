"use client"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-48 bg-black border-r border-gray-800 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded" />
          <span className="text-white font-semibold">Your app</span>
        </div>
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
