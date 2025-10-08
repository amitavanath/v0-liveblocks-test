// Mock data for development
import type {
  Institution,
  Department,
  Program,
  Course,
  AcademicTerm,
  CourseOffering,
  Student,
  Instructor,
  Enrollment,
} from "./types"

export const mockInstitution: Institution = {
  id: "inst-1",
  name: "Tech University",
  code: "TU",
  createdAt: new Date("2020-01-01"),
}

export const mockDepartments: Department[] = [
  {
    id: "dept-1",
    institutionId: "inst-1",
    name: "Computer Science",
    code: "CS",
    description: "Department of Computer Science and Engineering",
  },
  {
    id: "dept-2",
    institutionId: "inst-1",
    name: "Mathematics",
    code: "MATH",
    description: "Department of Mathematics",
  },
  {
    id: "dept-3",
    institutionId: "inst-1",
    name: "Physics",
    code: "PHYS",
    description: "Department of Physics",
  },
]

export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    departmentId: "dept-1",
    name: "Bachelor of Science in Computer Science",
    code: "BSCS",
    degreeType: "bachelor",
  },
  {
    id: "prog-2",
    departmentId: "dept-2",
    name: "Bachelor of Science in Mathematics",
    code: "BSMATH",
    degreeType: "bachelor",
  },
]

export const mockCourses: Course[] = [
  {
    id: "course-1",
    departmentId: "dept-1",
    code: "CS101",
    name: "Introduction to Computer Science",
    description: "Fundamental concepts of computer science and programming",
    credits: 3,
  },
  {
    id: "course-2",
    departmentId: "dept-1",
    code: "CS201",
    name: "Data Structures and Algorithms",
    description: "Study of fundamental data structures and algorithms",
    credits: 4,
  },
  {
    id: "course-3",
    departmentId: "dept-2",
    code: "MATH101",
    name: "Calculus I",
    description: "Introduction to differential calculus",
    credits: 4,
  },
]

export const mockTerms: AcademicTerm[] = [
  {
    id: "term-1",
    name: "Fall 2025",
    year: 2025,
    season: "fall",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-12-15"),
  },
  {
    id: "term-2",
    name: "Spring 2026",
    year: 2026,
    season: "spring",
    startDate: new Date("2026-01-15"),
    endDate: new Date("2026-05-15"),
  },
]

export const mockInstructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@tu.edu",
    departmentId: "dept-1",
    title: "Associate Professor",
  },
  {
    id: "inst-2",
    name: "Prof. Michael Chen",
    email: "michael.chen@tu.edu",
    departmentId: "dept-1",
    title: "Professor",
  },
]

export const mockOfferings: CourseOffering[] = [
  {
    id: "offering-1",
    courseId: "course-1",
    termId: "term-1",
    instructorId: "inst-1",
    section: "A",
    capacity: 30,
    enrolledCount: 25,
    status: "open",
  },
  {
    id: "offering-2",
    courseId: "course-1",
    termId: "term-1",
    instructorId: "inst-2",
    section: "B",
    capacity: 30,
    enrolledCount: 28,
    status: "open",
  },
  {
    id: "offering-3",
    courseId: "course-2",
    termId: "term-1",
    instructorId: "inst-1",
    section: "A",
    capacity: 25,
    enrolledCount: 20,
    status: "open",
  },
]

export const mockStudents: Student[] = [
  {
    id: "student-1",
    name: "Alice Smith",
    email: "alice.smith@student.tu.edu",
    programId: "prog-1",
    enrollmentYear: 2024,
  },
  {
    id: "student-2",
    name: "Bob Johnson",
    email: "bob.johnson@student.tu.edu",
    programId: "prog-1",
    enrollmentYear: 2024,
  },
  {
    id: "student-3",
    name: "Carol Williams",
    email: "carol.williams@student.tu.edu",
    programId: "prog-1",
    enrollmentYear: 2025,
  },
]

export const mockEnrollments: Enrollment[] = [
  {
    id: "enroll-1",
    studentId: "student-1",
    offeringId: "offering-1",
    enrolledAt: new Date("2025-08-15"),
    status: "enrolled",
  },
  {
    id: "enroll-2",
    studentId: "student-2",
    offeringId: "offering-2",
    enrolledAt: new Date("2025-08-16"),
    status: "enrolled",
  },
  {
    id: "enroll-3",
    studentId: "student-1",
    offeringId: "offering-3",
    enrolledAt: new Date("2025-08-15"),
    status: "enrolled",
  },
]
