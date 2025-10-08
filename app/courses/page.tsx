"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Users, BookOpen, ChevronRight } from "lucide-react"
import { useUser } from "@/lib/user-context"

interface Course {
  id: string
  name: string
  description: string
  studentCount: number
  topicCount: number
  createdAt: string
}

export default function CoursesPage() {
  const router = useRouter()
  const { user } = useUser()
  const isTutor = user.role === "tutor"

  const [courses, setCourses] = useState<Course[]>([
    {
      id: "maths-year7",
      name: "Year 7 Maths Extension",
      description: "Advanced mathematics for Year 7 students",
      studentCount: 24,
      topicCount: 8,
      createdAt: "2025-01-15",
    },
    {
      id: "english-year8",
      name: "Year 8 English",
      description: "Comprehensive English language and literature",
      studentCount: 18,
      topicCount: 12,
      createdAt: "2025-01-10",
    },
  ])

  return (
    <div className="flex-1 bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-gray-400">
              {isTutor ? "Manage your courses and students" : "View your enrolled courses"}
            </p>
          </div>
          {isTutor && (
            <button
              onClick={() => router.push("/courses/create")}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Course</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/courses/${course.id}`)}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{course.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{course.studentCount} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.topicCount} topics</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <span className="text-xs text-gray-500">Created {new Date(course.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses yet</h3>
            <p className="text-gray-500 mb-6">
              {isTutor ? "Create your first course to get started" : "You haven't been enrolled in any courses yet"}
            </p>
            {isTutor && (
              <button
                onClick={() => router.push("/courses/create")}
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                Create Your First Course
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
