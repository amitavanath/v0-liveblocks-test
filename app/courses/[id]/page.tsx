"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Users, Plus, Settings, BookOpen, Calendar, User } from "lucide-react"
import { useUser } from "@/lib/user-context"
import { mockOfferings, mockCourses, mockTerms, mockInstructors, mockEnrollments, mockStudents } from "@/lib/mock-data"

export default function CourseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useUser()
  const isTutor = user.role === "tutor"

  const offeringId = params.id as string
  const offering = mockOfferings.find((o) => o.id === offeringId)
  const course = mockCourses.find((c) => c.id === offering?.courseId)
  const term = mockTerms.find((t) => t.id === offering?.termId)
  const instructor = mockInstructors.find((i) => i.id === offering?.instructorId)
  const enrollments = mockEnrollments.filter((e) => e.offeringId === offeringId)
  const enrolledStudents = enrollments.map((enrollment) => {
    const student = mockStudents.find((s) => s.id === enrollment.studentId)
    return { ...student, enrollment }
  })

  const [showAddStudent, setShowAddStudent] = useState(false)
  const [studentEmail, setStudentEmail] = useState("")

  const handleAddStudent = () => {
    if (studentEmail.trim()) {
      // TODO: Add student to course offering
      console.log("[v0] Adding student to offering:", studentEmail)
      setStudentEmail("")
      setShowAddStudent(false)
    }
  }

  if (!offering || !course) {
    return (
      <div className="flex-1 bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400">Course offering not found</p>
        </div>
      </div>
    )
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
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-mono text-gray-400">{course.code}</span>
              <span className="px-3 py-1 bg-gray-800 rounded text-sm">Section {offering.section}</span>
              <span className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {term?.name}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
            <p className="text-gray-400 mb-4">{course.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{instructor?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.credits} credits</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {enrollments.length}/{offering.capacity} enrolled
                </span>
              </div>
            </div>
          </div>
          {isTutor && (
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          )}
        </div>

        {/* Students Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Enrolled Students ({enrolledStudents.length})</h2>
            </div>
            {isTutor && (
              <button
                onClick={() => setShowAddStudent(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Enroll Student</span>
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
                  Enroll
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
            {enrolledStudents.map((student) => (
              <div key={student?.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                  <div>
                    <div className="font-medium">{student?.name}</div>
                    <div className="text-sm text-gray-400">{student?.email}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Enrolled {new Date(student?.enrollment?.enrolledAt || "").toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {enrolledStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No students enrolled yet. {isTutor && "Enroll students to get started."}
            </div>
          )}
        </div>

        {/* Course Content Button */}
        <div>
          <button
            onClick={() => router.push(`/editor?courseId=${offeringId}`)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Course Content</h3>
                <p className="text-sm text-gray-400">View and edit course materials, topics, and pages</p>
              </div>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
