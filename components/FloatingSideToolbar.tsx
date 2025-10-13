"use client"

import { Sparkles, Save, Variable, Plus } from "lucide-react"
import { useState } from "react"

interface FloatingSideToolbarProps {
  onAskAI: () => void
  onVariables: () => void
  onMyTemplates: () => void
  onMoreTools?: () => void
}

export function FloatingSideToolbar({ onAskAI, onVariables, onMyTemplates, onMoreTools }: FloatingSideToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl overflow-hidden">
        {/* Ask AI */}
        <button
          onClick={onAskAI}
          className="w-full px-3 py-3 hover:bg-purple-600/20 text-purple-400 transition-colors flex items-center gap-3 group"
          title="Ask AI (⌘+')"
        >
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          {isExpanded && (
            <span className="text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Ask AI
            </span>
          )}
        </button>

        {/* Variables */}
        <button
          onClick={onVariables}
          className="w-full px-3 py-3 hover:bg-gray-700 text-gray-300 transition-colors flex items-center gap-3 border-t border-gray-700 group"
          title="Insert Variables"
        >
          <Variable className="w-5 h-5 flex-shrink-0" />
          {isExpanded && (
            <span className="text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Variables
            </span>
          )}
        </button>

        {/* My Templates */}
        <button
          onClick={onMyTemplates}
          className="w-full px-3 py-3 hover:bg-gray-700 text-gray-300 transition-colors flex items-center gap-3 border-t border-gray-700 group"
          title="My Templates"
        >
          <Save className="w-5 h-5 flex-shrink-0" />
          {isExpanded && (
            <span className="text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              My Templates
            </span>
          )}
        </button>

        {/* More Tools */}
        {onMoreTools && (
          <button
            onClick={onMoreTools}
            className="w-full px-3 py-3 hover:bg-gray-700 text-gray-300 transition-colors flex items-center gap-3 border-t border-gray-700 group"
            title="More Tools"
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {isExpanded && (
              <span className="text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                More
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
