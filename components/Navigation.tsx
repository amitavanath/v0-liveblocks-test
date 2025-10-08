"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-gray-200 mb-8">
      <div className="px-8 py-4 flex gap-8 items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <div className="flex gap-6">
          <Link
            href="/"
            className={`hover:text-gray-900 ${pathname === "/" ? "text-gray-900 font-semibold" : "text-gray-600"}`}
          >
            Home
          </Link>
          <Link
            href="/editor"
            className={`hover:text-gray-900 ${pathname === "/editor" ? "text-gray-900 font-semibold" : "text-gray-600"}`}
          >
            Editor
          </Link>
          <Link
            href="/about"
            className={`hover:text-gray-900 ${pathname === "/about" ? "text-gray-900 font-semibold" : "text-gray-600"}`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}
