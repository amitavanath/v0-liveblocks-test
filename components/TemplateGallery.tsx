"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Clock, FileText } from "lucide-react"
import type { TemplateKey } from "./course-templates"

interface TemplateMetadata {
  key: TemplateKey
  name: string
  icon: string
  description: string
  category: string
  tags: string[]
  preview: string
  isFavorite?: boolean
  lastUsed?: Date
}

const templateMetadata: TemplateMetadata[] = [
  {
    key: "projectPlan",
    name: "Project Plan",
    icon: "📋",
    description: "Comprehensive course planning template with objectives, timeline, and assessment strategy",
    category: "Planning",
    tags: ["course-design", "planning", "objectives"],
    preview: "Structured template for planning course projects with learning objectives and milestones",
  },
  {
    key: "lessonPlan",
    name: "Lesson Plan",
    icon: "📖",
    description: "Detailed lesson planning template with objectives, activities, and assessment",
    category: "Teaching",
    tags: ["lesson", "teaching", "activities"],
    preview: "Step-by-step lesson structure with introduction, main content, and assessment",
  },
  {
    key: "syllabus",
    name: "Course Syllabus",
    icon: "📄",
    description: "Complete syllabus template with course info, policies, and schedule",
    category: "Documentation",
    tags: ["syllabus", "policies", "schedule"],
    preview: "Professional syllabus with all essential course information and policies",
  },
  {
    key: "assessment",
    name: "Assessment Template",
    icon: "✅",
    description: "Assessment design template with rubrics and grading criteria",
    category: "Assessment",
    tags: ["assessment", "grading", "rubric"],
    preview: "Structured assessment with clear instructions and grading rubric",
  },
]

interface TemplateGalleryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTemplate: (templateKey: TemplateKey) => void
  recentTemplates?: TemplateKey[]
  favoriteTemplates?: TemplateKey[]
}

export function TemplateGallery({
  open,
  onOpenChange,
  onSelectTemplate,
  recentTemplates = [],
  favoriteTemplates = [],
}: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "Planning", "Teaching", "Documentation", "Assessment"]

  const filteredTemplates = templateMetadata.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const recentTemplateData = templateMetadata.filter((t) => recentTemplates.includes(t.key))
  const favoriteTemplateData = templateMetadata.filter((t) => favoriteTemplates.includes(t.key))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Choose a Template</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto space-y-6">
          {/* Recent Templates */}
          {recentTemplateData.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-300">Recently Used</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {recentTemplateData.map((template) => (
                  <TemplateCard
                    key={template.key}
                    template={template}
                    onSelect={() => {
                      onSelectTemplate(template.key)
                      onOpenChange(false)
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Favorite Templates */}
          {favoriteTemplateData.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-500" />
                <h3 className="text-sm font-semibold text-gray-300">Favorites</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {favoriteTemplateData.map((template) => (
                  <TemplateCard
                    key={template.key}
                    template={template}
                    onSelect={() => {
                      onSelectTemplate(template.key)
                      onOpenChange(false)
                    }}
                    isFavorite
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Templates */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">All Templates</h3>
            <div className="grid grid-cols-2 gap-3">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.key}
                  template={template}
                  onSelect={() => {
                    onSelectTemplate(template.key)
                    onOpenChange(false)
                  }}
                  isFavorite={favoriteTemplates.includes(template.key)}
                />
              ))}
            </div>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No templates found matching your search</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TemplateCard({
  template,
  onSelect,
  isFavorite,
}: {
  template: TemplateMetadata
  onSelect: () => void
  isFavorite?: boolean
}) {
  return (
    <button
      onClick={onSelect}
      className="group relative bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-lg p-4 text-left transition-all"
    >
      {isFavorite && <Star className="absolute top-3 right-3 w-4 h-4 text-yellow-500 fill-yellow-500" />}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl">{template.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{template.name}</h4>
          <p className="text-xs text-gray-400 line-clamp-2">{template.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
          {template.category}
        </Badge>
      </div>
    </button>
  )
}
