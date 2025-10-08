"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X } from "lucide-react"

export default function CreateCoursePage() {
  const router = useRouter()
  const [courseName, setCourseName] = useState("")
  const [description, setDescription] = useState("")
  const [topics, setTopics] = useState<string[]>([])
  const [newTopic, setNewTopic] = useState("")

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic.trim()])
      setNewTopic("")
    }
  }

  const handleRemoveTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index))
  }

  const handleCreateCourse = () => {
    if (courseName.trim()) {
      // TODO: Save course to database
      console.log("[v0] Creating course:", { courseName, description, topics })
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

        <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
        <p className="text-gray-400 mb-8">Set up a new course with topics and materials</p>

        <div className="space-y-6">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g., Year 7 Maths Extension"
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

          {/* Topics */}
          <div>
            <label className="block text-sm font-medium mb-2">Topics</label>
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3"
                >
                  <span className="flex-1">{topic}</span>
                  <button
                    onClick={() => handleRemoveTopic(index)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTopic()
                  }}
                  placeholder="Add a topic..."
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-700 text-white placeholder-gray-500"
                />
                <button
                  onClick={handleAddTopic}
                  className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleCreateCourse}
              disabled={!courseName.trim()}
              className="flex-1 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Course
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
