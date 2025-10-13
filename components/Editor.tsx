"use client"

import { useLiveblocksExtension, FloatingToolbar, AnchoredThreads, FloatingComposer } from "@liveblocks/react-tiptap"
import { useThreads } from "@liveblocks/react/suspense"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { Placeholder } from "@tiptap/extension-placeholder"
import { SlashCommand } from "@/lib/slash-command-extension"
import { useUser } from "@/lib/user-context"
import { useEffect, useState } from "react"
import type { TemplateKey } from "./course-templates"
import { TemplateGallery } from "./TemplateGallery"
import { CustomTemplateManager } from "./CustomTemplateManager"
import { TemplateOnboarding } from "./TemplateOnboarding"
import { GuidedTemplateSetup } from "./GuidedTemplateSetup"
import { AIAssistant } from "./AIAssistant"
import { FileText, TableIcon, Info, List, Plus, Save } from "lucide-react"
import type { SavedTemplate } from "@/lib/types"
import { VariableInserter } from "./VariableInserter"
import { FloatingSideToolbar } from "./FloatingSideToolbar"

export function Editor() {
  const { user } = useUser()
  const isStudent = user.role === "student"
  const [showTemplates, setShowTemplates] = useState(false)
  const [showElements, setShowElements] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [showCustomTemplates, setShowCustomTemplates] = useState(false)
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([])
  const [recentTemplates, setRecentTemplates] = useState<TemplateKey[]>([])
  const [favoriteTemplates, setFavoriteTemplates] = useState<TemplateKey[]>(["projectPlan"])
  const [showVariableInserter, setShowVariableInserter] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showGuidedSetup, setShowGuidedSetup] = useState(false)
  const [selectedTemplateForSetup, setSelectedTemplateForSetup] = useState<TemplateKey | null>(null)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [hasThreads, setHasThreads] = useState(false)

  const liveblocks = useLiveblocksExtension()
  const { threads } = useThreads({ query: { resolved: false } })

  const editor = useEditor({
    immediatelyRender: false,
    editable: !isStudent,
    editorProps: {
      attributes: {
        class: "outline-none transition-all prose prose-invert max-w-4xl mx-auto px-16 py-20 min-h-[calc(100vh-200px)]",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Table.configure({
        resizable: false,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full my-4",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border-b border-gray-700",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-gray-700 px-4 py-3 text-left",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-gray-700 px-4 py-3 text-left font-semibold bg-gray-800",
        },
      }),
      Placeholder.configure({
        placeholder: "Use ⌘+' to ask AI, or type / to insert elements",
      }),
      SlashCommand,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const text = editor.getText().trim()
      setIsEmpty(text.length === 0)
    },
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "'") {
        e.preventDefault()
        setShowAIAssistant(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isStudent)
    }
  }, [editor, isStudent])

  const handleInsertAIContent = (content: string) => {
    if (!editor) return
    editor.commands.insertContent(content)
    setIsEmpty(false)
  }

  const handleTemplateSelect = (templateKey: TemplateKey) => {
    if (!editor) return

    const templates = {
      projectPlan: `<h1>Project Plan</h1><table><tr><th>Driver</th><td>@mention the driver</td></tr><tr><th>Approver</th><td>@approver</td></tr><tr><th>Contributors</th><td>@contributors</td></tr><tr><th>Objective</th><td>Summarize the objective in 1-2 sentences</td></tr></table>`,
      lessonPlan: `<h1>Lesson Plan</h1><h2>Learning Objectives</h2><p>What students will learn...</p><h2>Materials Needed</h2><ul><li>Item 1</li><li>Item 2</li></ul>`,
      syllabus: `<h1>Course Syllabus</h1><h2>Course Description</h2><p>Course overview...</p><h2>Learning Outcomes</h2><ul><li>Outcome 1</li><li>Outcome 2</li></ul>`,
      assessment: `<h1>Assessment</h1><h2>Grading Criteria</h2><table><tr><th>Category</th><th>Weight</th></tr><tr><td>Assignments</td><td>40%</td></tr></table>`,
    }

    editor.commands.setContent(templates[templateKey] || "")
    setIsEmpty(false)
  }

  const insertTable = () => {
    if (!editor) return
    editor.chain().focus().insertTable({ rows: 3, cols: 4, withHeaderRow: true }).run()
    setIsEmpty(false)
  }

  const insertInfoPanel = () => {
    if (!editor) return
    editor.commands.insertContent("<blockquote><p>💡 Info: Add your information here</p></blockquote>")
    setIsEmpty(false)
  }

  const insertTableOfContents = () => {
    if (!editor) return
    editor.commands.insertContent(
      "<h2>Table of Contents</h2><ul><li>Section 1</li><li>Section 2</li><li>Section 3</li></ul>",
    )
    setIsEmpty(false)
  }

  const handleSaveCustomTemplate = (template: SavedTemplate) => {
    // Implementation for saving a custom template
  }

  const handleDeleteCustomTemplate = (templateKey: TemplateKey) => {
    // Implementation for deleting a custom template
  }

  const handleInsertVariable = (variable: string) => {
    // Implementation for inserting a variable
  }

  const handleOnboardingComplete = () => {
    // Implementation for handling onboarding completion
  }

  const handleGuidedSetupComplete = () => {
    // Implementation for handling guided setup completion
  }

  if (!editor) {
    return <div className="p-8 text-gray-400">Loading editor...</div>
  }

  return (
    <div className="h-full flex flex-col bg-[#191919]">
      {!isStudent && (
        <FloatingSideToolbar
          onAskAI={() => setShowAIAssistant(true)}
          onVariables={() => setShowVariableInserter(true)}
          onMyTemplates={() => setShowCustomTemplates(true)}
        />
      )}

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto relative">
          <EditorContent editor={editor} className="h-full" />

          {!isStudent && isEmpty && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 shadow-2xl">
                {/* Template buttons */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    onClick={() => handleTemplateSelect("projectPlan")}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Project plan
                  </button>
                  <button
                    onClick={() => handleTemplateSelect("lessonPlan")}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Lesson plan
                  </button>
                  <button
                    onClick={() => handleTemplateSelect("syllabus")}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Syllabus
                  </button>
                  <button
                    onClick={() => setShowTemplateGallery(true)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors"
                  >
                    All templates
                  </button>
                </div>

                {/* Element insertion buttons */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-700">
                  <button
                    onClick={insertTable}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors flex items-center gap-2"
                  >
                    <TableIcon className="w-4 h-4" />
                    Table
                  </button>
                  <button
                    onClick={insertInfoPanel}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors flex items-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    Info panel
                  </button>
                  <button
                    onClick={insertTableOfContents}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors flex items-center gap-2"
                  >
                    <List className="w-4 h-4" />
                    Table of contents
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    More elements
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {hasThreads && (
          <div className="w-96 border-l border-gray-800 overflow-auto p-4 bg-[#191919]">
            <AnchoredThreads editor={editor} threads={threads} />
          </div>
        )}
      </div>

      <FloatingToolbar editor={editor} />
      <FloatingComposer editor={editor} />

      <AIAssistant
        open={showAIAssistant}
        onOpenChange={setShowAIAssistant}
        onInsertContent={handleInsertAIContent}
        currentContent={editor.getText()}
      />

      <TemplateGallery
        open={showTemplateGallery}
        onOpenChange={setShowTemplateGallery}
        onSelectTemplate={handleTemplateSelect}
        recentTemplates={recentTemplates}
        favoriteTemplates={favoriteTemplates}
      />

      <CustomTemplateManager
        open={showCustomTemplates}
        onOpenChange={setShowCustomTemplates}
        onSaveTemplate={handleSaveCustomTemplate}
        onDeleteTemplate={handleDeleteCustomTemplate}
        savedTemplates={savedTemplates}
        currentContent={editor.getHTML()}
      />

      <VariableInserter
        open={showVariableInserter}
        onOpenChange={setShowVariableInserter}
        onInsertVariable={handleInsertVariable}
      />

      <TemplateOnboarding
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleOnboardingComplete}
      />

      <GuidedTemplateSetup
        open={showGuidedSetup}
        onOpenChange={setShowGuidedSetup}
        templateKey={selectedTemplateForSetup || "projectPlan"}
        onComplete={handleGuidedSetupComplete}
      />
    </div>
  )
}
