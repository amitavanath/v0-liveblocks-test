"use client"

import { useRouter } from "next/navigation"
import { BookOpen, Users, FileText, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { useUser } from "@/lib/user-context"

export default function Home() {
  const router = useRouter()
  const { user } = useUser()
  const isTutor = user.role === "tutor"

  const recentActivity = [
    { id: 1, type: "edit", course: "Year 7 Maths", topic: "Integers", time: "2 hours ago" },
    { id: 2, type: "comment", course: "Year 8 English", topic: "Grammar", time: "5 hours ago" },
    { id: 3, type: "create", course: "Year 7 Maths", topic: "Fractions", time: "1 day ago" },
  ]

  const stats = isTutor
    ? [
        { label: "Total Courses", value: "3", icon: BookOpen, color: "from-blue-500 to-blue-600" },
        { label: "Total Students", value: "42", icon: Users, color: "from-purple-500 to-purple-600" },
        { label: "Active Topics", value: "24", icon: FileText, color: "from-pink-500 to-pink-600" },
        { label: "This Week", value: "+12", icon: TrendingUp, color: "from-green-500 to-green-600" },
      ]
    : [
        { label: "Enrolled Courses", value: "3", icon: BookOpen, color: "from-blue-500 to-blue-600" },
        { label: "Topics Completed", value: "18", icon: FileText, color: "from-purple-500 to-purple-600" },
        { label: "Comments Made", value: "24", icon: TrendingUp, color: "from-pink-500 to-pink-600" },
        { label: "Study Hours", value: "12h", icon: Clock, color: "from-green-500 to-green-600" },
      ]

  return (
    <div className="flex-1 bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-gray-400">
            {isTutor ? "Here's what's happening with your courses today" : "Continue your learning journey"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium mb-1">
                      {activity.type === "edit" && "Edited document"}
                      {activity.type === "comment" && "Added comment"}
                      {activity.type === "create" && "Created topic"}
                    </div>
                    <div className="text-sm text-gray-400">
                      {activity.course} • {activity.topic}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex-shrink-0">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/courses")}
                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span>{isTutor ? "Manage Courses" : "View Courses"}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>

              {isTutor && (
                <button
                  onClick={() => router.push("/courses/create")}
                  className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span>Create Course</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              )}

              <button
                onClick={() => router.push("/editor")}
                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-pink-400" />
                  <span>Open Editor</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
