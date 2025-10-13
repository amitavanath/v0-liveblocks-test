"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Copy, Check } from "lucide-react"
import { availableVariables } from "@/lib/template-variables"

interface VariableInserterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInsertVariable: (variable: string) => void
}

export function VariableInserter({ open, onOpenChange, onInsertVariable }: VariableInserterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null)

  const filteredVariables = availableVariables
    .map((category) => ({
      ...category,
      variables: category.variables.filter(
        (v) =>
          v.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.variables.length > 0)

  const handleCopy = (variable: string) => {
    navigator.clipboard.writeText(variable)
    setCopiedVariable(variable)
    setTimeout(() => setCopiedVariable(null), 2000)
  }

  const handleInsert = (variable: string) => {
    onInsertVariable(variable)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[70vh] overflow-hidden flex flex-col bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Insert Variable</DialogTitle>
          <p className="text-sm text-gray-400 mt-1">
            Variables will be automatically replaced with actual values when the template is used
          </p>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search variables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex-1 overflow-auto space-y-4">
          {filteredVariables.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">{category.category}</h3>
              <div className="space-y-2">
                {category.variables.map((variable) => (
                  <div
                    key={variable.key}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <code className="text-sm text-blue-400 font-mono">{variable.key}</code>
                        <p className="text-xs text-gray-400 mt-1">{variable.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(variable.key)}
                          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedVariable === variable.key ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleInsert(variable.key)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                        >
                          Insert
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredVariables.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No variables found matching your search</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
