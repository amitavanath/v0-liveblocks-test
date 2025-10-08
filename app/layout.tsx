import type React from "react"
import type { Metadata } from "next"
import { Navigation } from "@/components/Navigation"
import "@liveblocks/react-ui/styles.css"
import "@liveblocks/react-tiptap/styles.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Collaborative Editor App",
  description: "A Next.js app with Liveblocks collaborative editing",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
