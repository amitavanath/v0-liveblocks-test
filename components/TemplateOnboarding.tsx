"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Sparkles, FileText, Zap, Users } from "lucide-react"

interface TemplateOnboardingProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
}

const onboardingSteps = [
  {
    title: "Welcome to the Course Editor",
    description: "Create engaging course content with our powerful collaborative editor and template system.",
    icon: Sparkles,
    features: [
      "Real-time collaboration with students and co-instructors",
      "Pre-built templates for common course materials",
      "Auto-fill with course information",
    ],
  },
  {
    title: "Start with Templates",
    description: "Choose from professionally designed templates to get started quickly.",
    icon: FileText,
    features: [
      "Project plans, lesson plans, syllabi, and assessments",
      "Customizable to fit your teaching style",
      "Save your own templates for reuse",
    ],
  },
  {
    title: "Smart Variables",
    description: "Templates automatically fill in course details like instructor name, term, and course code.",
    icon: Zap,
    features: [
      "Click 'Variables' to see all available placeholders",
      "Course info updates automatically across all documents",
      "Save time with intelligent auto-completion",
    ],
  },
  {
    title: "Collaborate in Real-Time",
    description: "Work together with your team and get feedback from students.",
    icon: Users,
    features: [
      "See who's viewing and editing in real-time",
      "Add comments and highlights to any text",
      "Students can comment but not edit content",
    ],
  },
]

export function TemplateOnboarding({ open, onOpenChange, onComplete }: TemplateOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
      onOpenChange(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
    onOpenChange(false)
  }

  const step = onboardingSteps[currentStep]
  const Icon = step.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
        <div className="py-6">
          {/* Progress indicator */}
          <div className="flex gap-2 mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-blue-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
              <Icon className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{step.title}</h2>
            <p className="text-gray-400 text-lg mb-6">{step.description}</p>

            <div className="bg-gray-800 rounded-lg p-6 text-left">
              <ul className="space-y-3">
                {step.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button onClick={handleSkip} variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
              Skip tutorial
            </Button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
                {currentStep < onboardingSteps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
