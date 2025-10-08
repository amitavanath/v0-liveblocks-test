"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Users, Plus, Settings } from "lucide-react"
import { useUser } from "@/lib/user-context"

interface Student {
  id: string
  name: string
  email: string
  enrolledAt: string
}

export default function CourseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useUser()
  const isTutor = user.role === "tutor"

  const [showAddStudent, setShowAddStudent] = useState(false)
  const [studentEmail, setStudentEmail] = useState("")
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      enrolledAt: "2025-01-20",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      enrolledAt: "2025-01-22",
    },
  ])

  const handleAddStudent = () => {
    if (studentEmail.trim()) {
      // TODO: Add student to course
      console.log("[v0] Adding student:", studentEmail)
      setStudentEmail("")
      setShowAddStudent(false)
    }
  }

  return (
    <div className="flex-1 bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/courses")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Courses</span>
        </button>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Year 7 Maths Extension</h1>
            <p className="text-gray-400">Advanced mathematics for Year 7 students</p>
          </div>
          {isTutor && (
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          )}
        </div>

        {/* Students Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Students ({students.length})</h2>
            </div>
            {isTutor && (
              <button
                onClick={() => setShowAddStudent(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
            )}
          </div>

          {showAddStudent && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <label className="block text-sm font-medium mb-2">Student Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddStudent()
                    if (e.key === "Escape") {
                      setShowAddStudent(false)
                      setStudentEmail("")
                    }
                  }}
                  placeholder="student@example.com"
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddStudent(false)
                    setStudentEmail("")
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-400">{student.email}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Enrolled {new Date(student.enrolledAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {students.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No students enrolled yet. {isTutor && "Add students to get started."}
            </div>
          )}
        </div>

        {/* Course Content Button */}
        <div className="mt-6">
          <button
            onClick={() => router.push("/editor")}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Course Content</h3>
                <p className="text-sm text-gray-400">View and edit course materials</p>
              </div>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
