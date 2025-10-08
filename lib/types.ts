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
  status: "draft" | "open" | "closed" | "completed"
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
