"use client"

import { FileText, LayoutDashboard, Table, PenTool } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function TopNav() {
  const pathname = usePathname()

  const tabs = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Document", href: "/editor", icon: FileText },
    { name: "Sheet", href: "/sheet", icon: Table },
    { name: "Whiteboard", href: "/whiteboard", icon: PenTool },
  ]

  return (
    <div className="bg-black border-b border-gray-800">
      <div className="flex items-center gap-1 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors ${
                isActive ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
