import type React from "react"
import type { Metadata } from "next"
import { ConditionalSidebar } from "@/components/ConditionalSidebar"
import { TopNav } from "@/components/TopNav"
import { UserProvider } from "@/lib/user-context"
import { DocumentProvider } from "@/lib/document-context"
import "@liveblocks/react-ui/styles.css"
import "@liveblocks/react-tiptap/styles.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Collaborative Editor App",
  description: "A Next.js app with Liveblocks collaborative editing",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white">
        <UserProvider>
          <DocumentProvider>
            <div className="flex h-screen overflow-hidden">
              <ConditionalSidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
          </DocumentProvider>
        </UserProvider>
      </body>
    </html>
  )
}
