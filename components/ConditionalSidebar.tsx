"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Sidebar } from "./Sidebar"

export function ConditionalSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  const showSidebar = courseId && (pathname === "/editor" || pathname === "/sheet" || pathname === "/whiteboard")

  if (!showSidebar) {
    return null
  }

  return <Sidebar />
}
