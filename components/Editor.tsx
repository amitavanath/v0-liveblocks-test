"use client"

import {
  useLiveblocksExtension,
  FloatingToolbar,
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap"
import { useThreads } from "@liveblocks/react/suspense"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function Editor() {
  const liveblocks = useLiveblocksExtension()
  const { threads } = useThreads({ query: { resolved: false } })

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "outline-none flex-1 transition-all",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
    ],
  })

  if (!editor) {
    return <div className="p-4">Loading editor...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
        💡 Tip: Select text to see the floating toolbar with comment options
      </div>
      <div className="flex gap-4 relative">
        <div className="flex-1 min-w-0">
          <EditorContent editor={editor} className="editor" />
        </div>
        <div className="hidden md:block w-80 flex-shrink-0">
          <AnchoredThreads editor={editor} threads={threads} />
        </div>
      </div>
      <FloatingToolbar editor={editor} />
      <FloatingThreads editor={editor} threads={threads} className="md:hidden" />
      <FloatingComposer editor={editor} />
    </div>
  )
}
