"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Share2, Lock } from "lucide-react"
import type { SavedTemplate } from "@/lib/types"

interface CustomTemplateManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveTemplate: (template: Omit<SavedTemplate, "id" | "createdAt" | "updatedAt">) => void
  onDeleteTemplate: (templateId: string) => void
  savedTemplates: SavedTemplate[]
  currentContent?: string
}

export function CustomTemplateManager({
  open,
  onOpenChange,
  onSaveTemplate,
  onDeleteTemplate,
  savedTemplates,
  currentContent,
}: CustomTemplateManagerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    isPublic: false,
  })

  const handleSave = () => {
    if (!formData.name || !currentContent) return

    onSaveTemplate({
      userId: "current-user", // This would come from auth context
      name: formData.name,
      description: formData.description,
      category: formData.category || "Custom",
      tags: formData.tags.split(",").map((t) => t.trim()),
      content: currentContent,
      isPublic: formData.isPublic,
    })

    setFormData({
      name: "",
      description: "",
      category: "",
      tags: "",
      isPublic: false,
    })
    setIsCreating(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">My Templates</DialogTitle>
        </DialogHeader>

        {!isCreating ? (
          <div className="flex-1 overflow-auto space-y-4">
            <Button
              onClick={() => setIsCreating(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!currentContent}
            >
              <Plus className="w-4 h-4 mr-2" />
              Save Current Document as Template
            </Button>

            {savedTemplates.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Save className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No custom templates yet</p>
                <p className="text-sm mt-2">Create a document and save it as a template to reuse later</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-400">{template.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {template.isPublic ? (
                          <Share2 className="w-4 h-4 text-blue-400" title="Shared" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" title="Private" />
                        )}
                        <button
                          onClick={() => onDeleteTemplate(template.id)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                        {template.category}
                      </Badge>
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-auto space-y-4">
            <div>
              <Label htmlFor="template-name" className="text-gray-300">
                Template Name *
              </Label>
              <Input
                id="template-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., My Lesson Plan Template"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="template-description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="template-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this template is for..."
                className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="template-category" className="text-gray-300">
                Category
              </Label>
              <Input
                id="template-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Teaching, Assessment"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="template-tags" className="text-gray-300">
                Tags (comma-separated)
              </Label>
              <Input
                id="template-tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g., lesson, activities, assessment"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="template-public"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-4 h-4 rounded border-gray-700 bg-gray-800"
              />
              <Label htmlFor="template-public" className="text-gray-300 cursor-pointer">
                Share with department (others can use this template)
              </Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
              <Button
                onClick={() => setIsCreating(false)}
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
