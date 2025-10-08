"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { mockDepartments, mockTerms, mockInstructors } from "@/lib/mock-data"

export default function CreateCoursePage() {
  const router = useRouter()

  const [departmentId, setDepartmentId] = useState("")
  const [courseCode, setCourseCode] = useState("")
  const [courseName, setCourseName] = useState("")
  const [description, setDescription] = useState("")
  const [credits, setCredits] = useState(3)
  const [termId, setTermId] = useState("")
  const [instructorId, setInstructorId] = useState("")
  const [section, setSection] = useState("A")
  const [capacity, setCapacity] = useState(30)

  const handleCreateCourse = () => {
    if (courseName.trim() && departmentId && termId && instructorId) {
      // TODO: Save course and offering to database
      console.log("[v0] Creating course:", {
        departmentId,
        courseCode,
        courseName,
        description,
        credits,
        termId,
        instructorId,
        section,
        capacity,
      })
      router.push("/courses")
    }
  }

  return (
    <div className="flex-1 bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Courses</span>
        </button>

        <h1 className="text-3xl font-bold mb-2">Create New Course Offering</h1>
        <p className="text-gray-400 mb-8">Set up a new course offering for a specific term</p>

        <div className="space-y-6">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white"
            >
              <option value="">Select department...</option>
              {mockDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} ({dept.code})
                </option>
              ))}
            </select>
          </div>

          {/* Course Code and Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Course Code</label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g., CS101"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Credits</label>
              <input
                type="number"
                value={credits}
                onChange={(e) => setCredits(Number.parseInt(e.target.value))}
                min="1"
                max="6"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g., Introduction to Computer Science"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the course..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white placeholder-gray-500 resize-none"
            />
          </div>

          {/* Term and Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Academic Term</label>
              <select
                value={termId}
                onChange={(e) => setTermId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white"
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
              <label className="block text-sm font-medium mb-2">Section</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="A"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Instructor and Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Instructor</label>
              <select
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white"
              >
                <option value="">Select instructor...</option>
                {mockInstructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number.parseInt(e.target.value))}
                min="1"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleCreateCourse}
              disabled={!courseName.trim() || !departmentId || !termId || !instructorId}
              className="flex-1 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Course Offering
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
