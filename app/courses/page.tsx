"use client"
import { useRouter } from "next/navigation"
import { Plus, Users, BookOpen, ChevronRight, Calendar } from "lucide-react"
import { useUser } from "@/lib/user-context"
import { mockOfferings, mockCourses, mockTerms, mockInstructors, mockEnrollments } from "@/lib/mock-data"

export default function CoursesPage() {
  const router = useRouter()
  const { user } = useUser()
  const isTutor = user.role === "tutor"

  const offerings = mockOfferings.map((offering) => {
    const course = mockCourses.find((c) => c.id === offering.courseId)
    const term = mockTerms.find((t) => t.id === offering.termId)
    const instructor = mockInstructors.find((i) => i.id === offering.instructorId)
    const enrollments = mockEnrollments.filter((e) => e.offeringId === offering.id)

    return {
      ...offering,
      course,
      term,
      instructor,
      enrollmentCount: enrollments.length,
    }
  })

  return (
    <div className="flex-1 bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Course Offerings</h1>
            <p className="text-gray-400">
              {isTutor ? "Manage your course offerings and students" : "View your enrolled courses"}
            </p>
          </div>
          {isTutor && (
            <button
              onClick={() => router.push("/courses/create")}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Offering</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offerings.map((offering) => (
            <div
              key={offering.id}
              onClick={() => router.push(`/courses/${offering.id}`)}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-gray-400">{offering.course?.code}</span>
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded">Section {offering.section}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">
                    {offering.course?.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{offering.course?.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {offering.enrollmentCount}/{offering.capacity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{offering.course?.credits} credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{offering.term?.name}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <span className="text-xs text-gray-500">Instructor: {offering.instructor?.name}</span>
              </div>
            </div>
          ))}
        </div>

        {offerings.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No course offerings yet</h3>
            <p className="text-gray-500 mb-6">
              {isTutor
                ? "Create your first course offering to get started"
                : "You haven't been enrolled in any courses yet"}
            </p>
            {isTutor && (
              <button
                onClick={() => router.push("/courses/create")}
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                Create Your First Offering
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
