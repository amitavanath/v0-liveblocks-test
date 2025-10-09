"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"
import { mockDepartments, mockTerms, mockInstructors } from "@/lib/mock-data"
import type { Course } from "@/lib/types"

type CourseFormData = Partial<Course> & {
  // Offering fields
  termId?: string
  instructorId?: string
  section?: string
  capacity?: number
  mode?: "in-person" | "online" | "hybrid"
  location?: string
  visibility?: "public" | "internal" | "restricted"
}

const COURSE_TEMPLATES = [
  {
    id: "lecture",
    name: "Lecture-Based Course",
    description: "Traditional lecture format with exams and assignments",
    type: "lecture" as const,
  },
  {
    id: "lab",
    name: "Lab Course",
    description: "Hands-on laboratory work with practical assessments",
    type: "lab" as const,
  },
  {
    id: "seminar",
    name: "Seminar Course",
    description: "Discussion-based with presentations and papers",
    type: "seminar" as const,
  },
  {
    id: "online",
    name: "Online Course",
    description: "Fully online with video lectures and digital assessments",
    type: "online" as const,
  },
]

export default function CreateCoursePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [formData, setFormData] = useState<CourseFormData>({
    language: "English",
    level: "undergraduate",
    credits: 3,
    status: "draft",
    mode: "in-person",
    visibility: "public",
    capacity: 30,
    section: "A",
    learningOutcomes: [],
    topics: [],
  })

  const steps = [
    { id: 1, name: "Template", description: "Choose a course template" },
    { id: 2, name: "Basic Info", description: "Course identity" },
    { id: 3, name: "Academic", description: "Metadata & prerequisites" },
    { id: 4, name: "Delivery", description: "Schedule & logistics" },
    { id: 5, name: "Publish", description: "Review & publish" },
  ]

  const updateFormData = (updates: Partial<CourseFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveDraft = () => {
    console.log("[v0] Saving draft:", formData)
    router.push("/courses")
  }

  const handlePublish = () => {
    console.log("[v0] Publishing course:", formData)
    router.push("/courses")
  }

  const getStepCompletion = () => {
    const completed = []
    if (selectedTemplate) completed.push(0)
    if (formData.name && formData.code && formData.departmentId) completed.push(1)
    if (formData.learningOutcomes && formData.learningOutcomes.length > 0) completed.push(2)
    if (formData.termId && formData.instructorId) completed.push(3)
    return completed
  }

  const completedSteps = getStepCompletion()
  const completionPercentage = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <div className="flex-1 bg-black text-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Courses</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
          <p className="text-gray-400">Follow the steps to set up your course offering</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Course Completion</span>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Step Navigation */}
          <div className="col-span-3">
            <div className="space-y-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    currentStep === index
                      ? "bg-gray-900 border border-gray-700"
                      : "bg-gray-950 border border-gray-900 hover:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        completedSteps.includes(index)
                          ? "bg-white text-black"
                          : currentStep === index
                            ? "bg-gray-700 text-white"
                            : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {completedSteps.includes(index) ? <Check className="w-4 h-4" /> : step.id}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.name}</div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="col-span-9">
            <div className="bg-gray-950 border border-gray-900 rounded-lg p-8">
              {/* Step 0: Template Selection */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Choose a Course Template</h2>
                    <p className="text-gray-400 text-sm">Start with a template to pre-fill common settings</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {COURSE_TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-6 rounded-lg border-2 text-left transition-all ${
                          selectedTemplate === template.id
                            ? "border-white bg-gray-900"
                            : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                        }`}
                      >
                        <h3 className="font-semibold mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-400">{template.description}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSelectedTemplate("custom")
                        handleNext()
                      }}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Skip and create from scratch →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Basic Course Information</h2>
                    <p className="text-gray-400 text-sm">Define the core identity of the course</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Department *</label>
                      <select
                        value={formData.departmentId || ""}
                        onChange={(e) => updateFormData({ departmentId: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                      >
                        <option value="">Select department...</option>
                        {mockDepartments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name} ({dept.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Course Code *</label>
                        <input
                          type="text"
                          value={formData.code || ""}
                          onChange={(e) => updateFormData({ code: e.target.value })}
                          placeholder="e.g., CS101"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Credits *</label>
                        <input
                          type="number"
                          value={formData.credits || 3}
                          onChange={(e) => updateFormData({ credits: Number.parseInt(e.target.value) })}
                          min="1"
                          max="6"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Level *</label>
                        <select
                          value={formData.level || "undergraduate"}
                          onChange={(e) =>
                            updateFormData({
                              level: e.target.value as "undergraduate" | "graduate" | "certificate",
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                        >
                          <option value="undergraduate">Undergraduate</option>
                          <option value="graduate">Graduate</option>
                          <option value="certificate">Certificate</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Course Name *</label>
                      <input
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        placeholder="e.g., Introduction to Computer Science"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => updateFormData({ description: e.target.value })}
                        placeholder="Brief description of the course..."
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <input
                          type="text"
                          value={formData.category || ""}
                          onChange={(e) => updateFormData({ category: e.target.value })}
                          placeholder="e.g., Core, Elective"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <input
                          type="text"
                          value={formData.language || "English"}
                          onChange={(e) => updateFormData({ language: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Metadata */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Academic Metadata</h2>
                    <p className="text-gray-400 text-sm">Define learning outcomes and academic relationships</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Learning Outcomes</label>
                      <textarea
                        value={formData.learningOutcomes?.join("\n") || ""}
                        onChange={(e) =>
                          updateFormData({
                            learningOutcomes: e.target.value.split("\n").filter((s) => s.trim()),
                          })
                        }
                        placeholder="Enter one learning outcome per line..."
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500 resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">One outcome per line</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Topics Covered</label>
                      <textarea
                        value={formData.topics?.join("\n") || ""}
                        onChange={(e) =>
                          updateFormData({
                            topics: e.target.value.split("\n").filter((s) => s.trim()),
                          })
                        }
                        placeholder="Enter topics covered in this course..."
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Target Audience</label>
                      <input
                        type="text"
                        value={formData.targetAudience || ""}
                        onChange={(e) => updateFormData({ targetAudience: e.target.value })}
                        placeholder="e.g., First-year CS students"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Delivery Planning */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Delivery Planning</h2>
                    <p className="text-gray-400 text-sm">Schedule and logistics for this offering</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Academic Term *</label>
                        <select
                          value={formData.termId || ""}
                          onChange={(e) => updateFormData({ termId: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                        >
                          <option value="">Select term...</option>
                          {mockTerms.map((term) => (
                            <option key={term.id} value={term.id}>
                              {term.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Section *</label>
                        <input
                          type="text"
                          value={formData.section || "A"}
                          onChange={(e) => updateFormData({ section: e.target.value })}
                          placeholder="A"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Instructor *</label>
                      <select
                        value={formData.instructorId || ""}
                        onChange={(e) => updateFormData({ instructorId: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                      >
                        <option value="">Select instructor...</option>
                        {mockInstructors.map((instructor) => (
                          <option key={instructor.id} value={instructor.id}>
                            {instructor.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Delivery Mode *</label>
                        <select
                          value={formData.mode || "in-person"}
                          onChange={(e) =>
                            updateFormData({
                              mode: e.target.value as "in-person" | "online" | "hybrid",
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                        >
                          <option value="in-person">In-Person</option>
                          <option value="online">Online</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Capacity *</label>
                        <input
                          type="number"
                          value={formData.capacity || 30}
                          onChange={(e) => updateFormData({ capacity: Number.parseInt(e.target.value) })}
                          min="1"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Visibility</label>
                        <select
                          value={formData.visibility || "public"}
                          onChange={(e) =>
                            updateFormData({
                              visibility: e.target.value as "public" | "internal" | "restricted",
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700"
                        >
                          <option value="public">Public</option>
                          <option value="internal">Internal</option>
                          <option value="restricted">Restricted</option>
                        </select>
                      </div>
                    </div>

                    {formData.mode !== "online" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={formData.location || ""}
                          onChange={(e) => updateFormData({ location: e.target.value })}
                          placeholder="e.g., Room 301, Building A"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 placeholder-gray-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review & Publish */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Review & Publish</h2>
                    <p className="text-gray-400 text-sm">Review your course details before publishing</p>
                  </div>

                  <div className="space-y-6 bg-gray-900 rounded-lg p-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Basic Information</h3>
                      <div className="space-y-1">
                        <p>
                          <span className="text-gray-500">Course:</span> {formData.code} - {formData.name}
                        </p>
                        <p>
                          <span className="text-gray-500">Credits:</span> {formData.credits}
                        </p>
                        <p>
                          <span className="text-gray-500">Level:</span> {formData.level}
                        </p>
                      </div>
                    </div>

                    {formData.learningOutcomes && formData.learningOutcomes.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Learning Outcomes</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {formData.learningOutcomes.map((outcome, i) => (
                            <li key={i} className="text-gray-300">
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Delivery Details</h3>
                      <div className="space-y-1">
                        <p>
                          <span className="text-gray-500">Mode:</span> {formData.mode}
                        </p>
                        <p>
                          <span className="text-gray-500">Capacity:</span> {formData.capacity} students
                        </p>
                        <p>
                          <span className="text-gray-500">Section:</span> {formData.section}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-400">
                      Publishing this course will make it visible to students for enrollment. You can save as draft to
                      continue editing later.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-800 mt-8">
                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <button
                      onClick={handleBack}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleSaveDraft}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Save Draft
                  </button>
                </div>

                <div>
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePublish}
                      disabled={
                        !formData.name ||
                        !formData.code ||
                        !formData.departmentId ||
                        !formData.termId ||
                        !formData.instructorId
                      }
                      className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Publish Course
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
