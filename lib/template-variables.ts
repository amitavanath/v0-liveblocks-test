import type { CourseOffering, Course, Instructor, AcademicTerm } from "./types"

export interface TemplateContext {
  course?: Course
  offering?: CourseOffering
  instructor?: Instructor
  term?: AcademicTerm
  user?: {
    name: string
    email: string
    role: string
  }
}

export function replaceTemplateVariables(content: string, context: TemplateContext): string {
  let result = content

  // Course variables
  if (context.course) {
    result = result.replace(/\{\{course\.name\}\}/g, context.course.name)
    result = result.replace(/\{\{course\.code\}\}/g, context.course.code)
    result = result.replace(/\{\{course\.credits\}\}/g, context.course.credits.toString())
    result = result.replace(/\{\{course\.description\}\}/g, context.course.description || "")
    result = result.replace(/\{\{course\.level\}\}/g, context.course.level)
  }

  // Offering variables
  if (context.offering) {
    result = result.replace(/\{\{offering\.section\}\}/g, context.offering.section)
    result = result.replace(/\{\{offering\.capacity\}\}/g, context.offering.capacity.toString())
    result = result.replace(/\{\{offering\.mode\}\}/g, context.offering.mode)
    result = result.replace(/\{\{offering\.location\}\}/g, context.offering.location || "TBD")
  }

  // Instructor variables
  if (context.instructor) {
    result = result.replace(/\{\{instructor\.name\}\}/g, context.instructor.name)
    result = result.replace(/\{\{instructor\.email\}\}/g, context.instructor.email)
    result = result.replace(/\{\{instructor\.title\}\}/g, context.instructor.title || "Instructor")
  }

  // Term variables
  if (context.term) {
    result = result.replace(/\{\{term\.name\}\}/g, context.term.name)
    result = result.replace(/\{\{term\.year\}\}/g, context.term.year.toString())
    result = result.replace(/\{\{term\.season\}\}/g, context.term.season)
    result = result.replace(/\{\{term\.startDate\}\}/g, context.term.startDate.toLocaleDateString())
    result = result.replace(/\{\{term\.endDate\}\}/g, context.term.endDate.toLocaleDateString())
  }

  // User variables
  if (context.user) {
    result = result.replace(/\{\{user\.name\}\}/g, context.user.name)
    result = result.replace(/\{\{user\.email\}\}/g, context.user.email)
    result = result.replace(/\{\{user\.role\}\}/g, context.user.role)
  }

  // Date variables
  const now = new Date()
  result = result.replace(/\{\{date\.today\}\}/g, now.toLocaleDateString())
  result = result.replace(/\{\{date\.year\}\}/g, now.getFullYear().toString())

  return result
}

export const availableVariables = [
  {
    category: "Course",
    variables: [
      { key: "{{course.name}}", description: "Course name" },
      { key: "{{course.code}}", description: "Course code" },
      { key: "{{course.credits}}", description: "Credit hours" },
      { key: "{{course.description}}", description: "Course description" },
      { key: "{{course.level}}", description: "Course level" },
    ],
  },
  {
    category: "Offering",
    variables: [
      { key: "{{offering.section}}", description: "Section number" },
      { key: "{{offering.capacity}}", description: "Class capacity" },
      { key: "{{offering.mode}}", description: "Delivery mode" },
      { key: "{{offering.location}}", description: "Class location" },
    ],
  },
  {
    category: "Instructor",
    variables: [
      { key: "{{instructor.name}}", description: "Instructor name" },
      { key: "{{instructor.email}}", description: "Instructor email" },
      { key: "{{instructor.title}}", description: "Instructor title" },
    ],
  },
  {
    category: "Term",
    variables: [
      { key: "{{term.name}}", description: "Term name" },
      { key: "{{term.year}}", description: "Academic year" },
      { key: "{{term.season}}", description: "Term season" },
      { key: "{{term.startDate}}", description: "Term start date" },
      { key: "{{term.endDate}}", description: "Term end date" },
    ],
  },
  {
    category: "User",
    variables: [
      { key: "{{user.name}}", description: "Current user name" },
      { key: "{{user.email}}", description: "Current user email" },
      { key: "{{user.role}}", description: "Current user role" },
    ],
  },
  {
    category: "Date",
    variables: [
      { key: "{{date.today}}", description: "Today's date" },
      { key: "{{date.year}}", description: "Current year" },
    ],
  },
]
