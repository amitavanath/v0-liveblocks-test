"use client"

import { useState } from "react"
import { Sparkles, X, ThumbsUp, ThumbsDown, Copy, MessageSquare, ArrowLeft } from "lucide-react"
import { generateText } from "ai"

interface AIAssistantProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInsertContent: (content: string) => void
  currentContent?: string
}

const AI_PROMPTS = [
  {
    id: "generate-lesson",
    label: "Generate a lesson plan for me.",
    icon: "📚",
  },
  {
    id: "review-content",
    label: "Review this content for me.",
    icon: "✍️",
  },
  {
    id: "add-activities",
    label: "What are some activities I could add to this lesson?",
    icon: "🎯",
  },
  {
    id: "create-assessment",
    label: "Create an assessment for this topic.",
    icon: "📝",
  },
]

export function AIAssistant({ open, onOpenChange, onInsertContent, currentContent }: AIAssistantProps) {
  const [customPrompt, setCustomPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [includeContext, setIncludeContext] = useState(true)
  const [showPrompts, setShowPrompts] = useState(true)
  const [currentPromptLabel, setCurrentPromptLabel] = useState("")

  const handlePromptSelect = async (prompt: string, label: string) => {
    setCurrentPromptLabel(label)
    setShowPrompts(false)
    await generateContent(prompt)
  }

  const handleCustomPrompt = async () => {
    if (!customPrompt.trim()) return
    setCurrentPromptLabel(customPrompt)
    setShowPrompts(false)
    await generateContent(customPrompt)
  }

  const generateContent = async (prompt: string) => {
    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const contextPrompt =
        includeContext && currentContent ? `Context from current page:\n${currentContent}\n\n${prompt}` : prompt

      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        prompt: contextPrompt,
        system:
          "You are a helpful AI assistant for educators. Generate clear, structured, and educational content. Format your responses in HTML with proper headings, paragraphs, and lists.",
      })

      setGeneratedContent(text)
    } catch (error) {
      console.error("[v0] AI generation error:", error)
      setGeneratedContent("Sorry, I encountered an error generating content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleInsert = () => {
    onInsertContent(generatedContent)
    handleClose()
  }

  const handleClose = () => {
    setShowPrompts(true)
    setGeneratedContent("")
    setCustomPrompt("")
    setCurrentPromptLabel("")
    onOpenChange(false)
  }

  const handleBack = () => {
    setShowPrompts(true)
    setGeneratedContent("")
    setCurrentPromptLabel("")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl w-full max-w-3xl mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            {!showPrompts && (
              <button onClick={handleBack} className="p-1 hover:bg-gray-800 rounded transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
            )}
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-gray-800 rounded transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {showPrompts ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <span>Tell Agent to write anything or choose from the below</span>
              </div>

              {/* Custom prompt input */}
              <div className="relative">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomPrompt()}
                  placeholder="Ask AI to generate content..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Suggested prompts */}
              <div className="space-y-2">
                {AI_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handlePromptSelect(prompt.label, prompt.label)}
                    className="w-full flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left group"
                  >
                    <span className="text-2xl">{prompt.icon}</span>
                    <span className="text-white group-hover:text-purple-400 transition-colors">{prompt.label}</span>
                  </button>
                ))}
              </div>

              {/* Context toggle */}
              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="include-context"
                  checked={includeContext}
                  onChange={(e) => setIncludeContext(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                />
                <label htmlFor="include-context" className="text-sm text-gray-400">
                  Include knowledge from current page
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Current prompt badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                  <Sparkles className="w-4 h-4" />
                  <span>{currentPromptLabel}</span>
                  <button onClick={handleBack} className="hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Generated content */}
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Generating content...</p>
                  </div>
                </div>
              ) : generatedContent ? (
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-6 text-gray-300 prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: generatedContent }} />
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-800 rounded transition-colors" title="Like">
                        <ThumbsUp className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-800 rounded transition-colors" title="Dislike">
                        <ThumbsDown className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-gray-800 rounded transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                      >
                        Discard
                      </button>
                      <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Open in Chat
                      </button>
                      <button
                        onClick={handleInsert}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors font-medium"
                      >
                        Insert
                      </button>
                    </div>
                  </div>

                  {/* Follow-up prompt */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask AI what to do next..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="inline-block w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center text-[10px]">
                      i
                    </span>
                    Uses AI. Verify results.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
