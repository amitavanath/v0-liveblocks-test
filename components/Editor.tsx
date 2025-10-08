"use client"

import { useLiveblocksExtension, FloatingToolbar, AnchoredThreads, FloatingComposer } from "@liveblocks/react-tiptap"
import { useThreads } from "@liveblocks/react/suspense"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function Editor() {
  const liveblocks = useLiveblocksExtension()
  const { threads } = useThreads({ query: { resolved: false } })

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none transition-all prose prose-invert max-w-4xl mx-auto px-8 py-8",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
    ],
    content: `
      <h1>Manifesto</h1>
      <p>Most SaaS products weren't built for the AI era. AI agents can't browse, interact, and collaborate inside apps just like humans—as they become more integrated into products, collaboration isn't just a nice-to-have—it's essential.</p>
    `,
  })

  const hasThreads = threads && threads.length > 0

  if (!editor) {
    return <div className="p-8 text-gray-400">Loading editor...</div>
  }

  return (
    <div className="h-full flex flex-col bg-black">
      <div className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          {/* Formatting toolbar will appear here via FloatingToolbar */}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-black flex items-center justify-center text-xs text-white">
              O
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-black flex items-center justify-center text-xs text-white">
              A
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-black flex items-center justify-center text-xs text-white">
              S
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-black flex items-center justify-center text-xs text-white">
              J
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <EditorContent editor={editor} className="h-full" />
        </div>
        {hasThreads && (
          <div className="w-96 border-l border-gray-800 overflow-auto p-4 bg-black">
            <AnchoredThreads editor={editor} threads={threads} />
          </div>
        )}
      </div>

      <FloatingToolbar editor={editor} />
      <FloatingComposer editor={editor} />
    </div>
  )
}
