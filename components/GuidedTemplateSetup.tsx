"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight } from "lucide-react"
import type { TemplateKey } from "./course-templates"

interface GuidedTemplateSetupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templateKey: TemplateKey
  onComplete: (customizations: Record<string, string>) => void
}

const templateSetupFields: Record<
  TemplateKey,
  Array<{ key: string; label: string; type: string; placeholder: string }>
> = {
  projectPlan: [
    { key: "title", label: "Project Title", type: "text", placeholder: "e.g., Final Research Project" },
    {
      key: "objectives",
      label: "Main Objectives",
      type: "textarea",
      placeholder: "What are the key learning objectives?",
    },
    { key: "duration", label: "Duration", type: "text", placeholder: "e.g., 8 weeks" },
  ],
  lessonPlan: [
    { key: "title", label: "Lesson Title", type: "text", placeholder: "e.g., Introduction to Variables" },
    { key: "duration", label: "Lesson Duration", type: "text", placeholder: "e.g., 50 minutes" },
    { key: "objectives", label: "Learning Objectives", type: "textarea", placeholder: "What will students learn?" },
  ],
  syllabus: [
    { key: "prerequisites", label: "Prerequisites", type: "text", placeholder: "e.g., CS100 or instructor permission" },
    {
      key: "textbook",
      label: "Required Textbook",
      type: "text",
      placeholder: "e.g., Introduction to Programming, 3rd Ed.",
    },
    {
      key: "grading",
      label: "Grading Breakdown",
      type: "textarea",
      placeholder: "e.g., Exams 40%, Projects 30%, Homework 20%, Participation 10%",
    },
  ],
  assessment: [
    { key: "title", label: "Assessment Title", type: "text", placeholder: "e.g., Midterm Exam" },
    { key: "type", label: "Assessment Type", type: "text", placeholder: "e.g., Exam, Quiz, Project" },
    { key: "points", label: "Total Points", type: "text", placeholder: "e.g., 100" },
  ],
}

export function GuidedTemplateSetup({ open, onOpenChange, templateKey, onComplete }: GuidedTemplateSetupProps) {
  const fields = templateSetupFields[templateKey] || []
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleComplete = () => {
    onComplete(formData)
    setFormData({})
    onOpenChange(false)
  }

  const handleSkip = () => {
    onComplete({})
    setFormData({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Customize Your Template</DialogTitle>
          <p className="text-sm text-gray-400 mt-1">
            Fill in these details to personalize your template. You can always edit them later.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {fields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key} className="text-gray-300">
                {field.label}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.key}
                  value={formData[field.key] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[80px]"
                />
              ) : (
                <Input
                  id={field.key}
                  type={field.type}
                  value={formData[field.key] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <Button onClick={handleSkip} variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
            Skip for now
          </Button>
          <Button onClick={handleComplete} className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Document
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
