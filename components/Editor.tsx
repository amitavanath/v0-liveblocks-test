"use client"

import { useLiveblocksExtension, FloatingToolbar, AnchoredThreads, FloatingComposer } from "@liveblocks/react-tiptap"
import { useThreads } from "@liveblocks/react/suspense"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useUser } from "@/lib/user-context"
import { useEffect } from "react"

export function Editor() {
  const { user } = useUser()
  const isStudent = user.role === "student"

  const liveblocks = useLiveblocksExtension()
  const { threads } = useThreads({ query: { resolved: false } })

  const editor = useEditor({
    immediatelyRender: false,
    editable: !isStudent,
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

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isStudent)
    }
  }, [editor, isStudent])

  const hasThreads = threads && threads.length > 0

  if (!editor) {
    return <div className="p-8 text-gray-400">Loading editor...</div>
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {isStudent && (
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-2 text-sm text-gray-400">
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Read-only mode • You can add comments and highlights
          </span>
        </div>
      )}

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
