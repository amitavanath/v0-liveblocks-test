// Core entity types for the educational platform

export type UserRole = "tutor" | "student" | "admin"

// Institution level
export interface Institution {
  id: string
  name: string
  code: string
  createdAt: Date
}

// Department level
export interface Department {
  id: string
  institutionId: string
  name: string
  code: string
  description?: string
}

// Program level (degree programs)
export interface Program {
  id: string
  departmentId: string
  name: string
  code: string
  degreeType: "bachelor" | "master" | "phd" | "certificate"
  description?: string
}

// Course level (catalog course)
export interface Course {
  id: string
  departmentId: string
  code: string
  name: string
  description?: string
  credits: number
  level: "undergraduate" | "graduate" | "certificate"
  category?: string
  language: string
  learningOutcomes?: string[]
  topics?: string[]
  targetAudience?: string
  status: "draft" | "under_review" | "approved" | "archived"
  createdAt: Date
  updatedAt: Date
}

// Prerequisite
export interface Prerequisite {
  id: string
  courseId: string
  prerequisiteCourseId: string
}

// Academic term
export interface AcademicTerm {
  id: string
  name: string
  year: number
  season: "fall" | "spring" | "summer" | "winter"
  startDate: Date
  endDate: Date
}

// Course offering (specific instance of a course)
export interface CourseOffering {
  id: string
  courseId: string
  termId: string
  instructorId: string
  section: string
  capacity: number
  enrolledCount: number
  mode: "in-person" | "online" | "hybrid"
  location?: string
  visibility: "public" | "internal" | "restricted"
  status: "draft" | "under_review" | "approved" | "active" | "completed" | "archived"
  createdAt: Date
  updatedAt: Date
}

// Class schedule
export interface ClassSchedule {
  id: string
  offeringId: string
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string
  endTime: string
  location?: string
}

// Student
export interface Student {
  id: string
  name: string
  email: string
  programId?: string
  enrollmentYear: number
}

// Instructor
export interface Instructor {
  id: string
  name: string
  email: string
  departmentId: string
  title?: string
}

// Enrollment (links students to course offerings)
export interface Enrollment {
  id: string
  studentId: string
  offeringId: string
  enrolledAt: Date
  status: "enrolled" | "dropped" | "completed"
  grade?: string
  gradePoints?: number
}

// Program requirement
export interface ProgramRequirement {
  id: string
  programId: string
  courseId: string
  isRequired: boolean
  category?: string
}

// Document/Page types for the collaborative editor
export interface Document {
  id: string
  offeringId: string
  title: string
  type: "document" | "whiteboard" | "sheet"
  content?: string
  createdAt: Date
  updatedAt: Date
}

export interface Topic {
  id: string
  offeringId: string
  name: string
  order: number
  parentId?: string
}

export interface Assessment {
  id: string
  offeringId: string
  name: string
  type: "exam" | "assignment" | "quiz" | "project" | "participation"
  weightage: number
  dueDate?: Date
  description?: string
}

export interface Resource {
  id: string
  offeringId: string
  title: string
  type: "textbook" | "article" | "video" | "link" | "tool"
  url?: string
  description?: string
  isRequired: boolean
}

export interface ContentUnit {
  id: string
  offeringId: string
  title: string
  type: "week" | "module" | "lesson"
  order: number
  objectives?: string[]
  description?: string
}

export interface CourseTemplate {
  id: string
  name: string
  description: string
  type: "lecture" | "lab" | "seminar" | "project" | "online"
  defaultFields: Partial<Course>
}
