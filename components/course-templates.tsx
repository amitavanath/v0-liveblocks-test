export const courseTemplates = {
  projectPlan: {
    name: "Project Plan",
    icon: "📋",
    content: `
      <h1>{{course.name}} - {{term.name}}</h1>
      <table>
        <tbody>
          <tr>
            <td><strong>Course Code</strong></td>
            <td>{{course.code}}</td>
          </tr>
          <tr>
            <td><strong>Course Lead</strong></td>
            <td>{{instructor.name}}</td>
          </tr>
          <tr>
            <td><strong>Term</strong></td>
            <td>{{term.season}} {{term.year}}</td>
          </tr>
          <tr>
            <td><strong>Section</strong></td>
            <td>{{offering.section}}</td>
          </tr>
          <tr>
            <td><strong>Target Audience</strong></td>
            <td>Describe the target students</td>
          </tr>
          <tr>
            <td><strong>Learning Objectives</strong></td>
            <td>Summarize the objectives in 1-2 sentences</td>
          </tr>
          <tr>
            <td><strong>Duration</strong></td>
            <td>{{term.startDate}} to {{term.endDate}}</td>
          </tr>
          <tr>
            <td><strong>Key Outcomes</strong></td>
            <td>List expected outcomes and success metrics</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>NOT STARTED / IN PROGRESS / COMPLETE</td>
          </tr>
        </tbody>
      </table>
      <h2>📚 Course Overview</h2>
      <p>{{course.description}}</p>
      <h2>🎯 Learning Modules</h2>
      <p>Break down the course into key modules or units.</p>
      <h2>📊 Assessment Strategy</h2>
      <p>Outline how students will be evaluated.</p>
      <h2>📅 Timeline</h2>
      <p>Define the course schedule and milestones.</p>
    `,
  },
  lessonPlan: {
    name: "Lesson Plan",
    icon: "📖",
    content: `
      <h1>Lesson Title</h1>
      <table>
        <tbody>
          <tr>
            <td><strong>Course</strong></td>
            <td>{{course.name}} ({{course.code}})</td>
          </tr>
          <tr>
            <td><strong>Instructor</strong></td>
            <td>{{instructor.name}}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>{{date.today}}</td>
          </tr>
          <tr>
            <td><strong>Duration</strong></td>
            <td>Lesson duration</td>
          </tr>
          <tr>
            <td><strong>Learning Objectives</strong></td>
            <td>What students will learn</td>
          </tr>
          <tr>
            <td><strong>Materials Needed</strong></td>
            <td>List required materials</td>
          </tr>
        </tbody>
      </table>
      <h2>🎯 Introduction</h2>
      <p>Hook and lesson overview</p>
      <h2>📚 Main Content</h2>
      <p>Core teaching content and activities</p>
      <h2>✅ Assessment</h2>
      <p>How to check for understanding</p>
      <h2>🏠 Homework/Extension</h2>
      <p>Follow-up activities</p>
    `,
  },
  syllabus: {
    name: "Course Syllabus",
    icon: "📄",
    content: `
      <h1>{{course.name}}</h1>
      <h2>Course Syllabus - {{term.name}}</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>Course Code</strong></td>
            <td>{{course.code}}</td>
          </tr>
          <tr>
            <td><strong>Instructor</strong></td>
            <td>{{instructor.name}} ({{instructor.email}})</td>
          </tr>
          <tr>
            <td><strong>Term</strong></td>
            <td>{{term.season}} {{term.year}}</td>
          </tr>
          <tr>
            <td><strong>Section</strong></td>
            <td>{{offering.section}}</td>
          </tr>
          <tr>
            <td><strong>Credits</strong></td>
            <td>{{course.credits}} credits</td>
          </tr>
          <tr>
            <td><strong>Mode</strong></td>
            <td>{{offering.mode}}</td>
          </tr>
          <tr>
            <td><strong>Location</strong></td>
            <td>{{offering.location}}</td>
          </tr>
          <tr>
            <td><strong>Capacity</strong></td>
            <td>{{offering.capacity}} students</td>
          </tr>
        </tbody>
      </table>
      <h2>📖 Course Description</h2>
      <p>{{course.description}}</p>
      <h2>🎯 Learning Outcomes</h2>
      <p>What students will be able to do by the end</p>
      <h2>📚 Required Materials</h2>
      <p>Textbooks, software, and other resources</p>
      <h2>📊 Grading Policy</h2>
      <p>Breakdown of assignments, exams, and participation</p>
      <h2>📅 Course Schedule</h2>
      <p>Week-by-week topics and assignments</p>
      <h2>📋 Course Policies</h2>
      <p>Attendance, late work, academic integrity</p>
    `,
  },
  assessment: {
    name: "Assessment Template",
    icon: "✅",
    content: `
      <h1>Assessment Name</h1>
      <table>
        <tbody>
          <tr>
            <td><strong>Course</strong></td>
            <td>{{course.name}} ({{course.code}})</td>
          </tr>
          <tr>
            <td><strong>Instructor</strong></td>
            <td>{{instructor.name}}</td>
          </tr>
          <tr>
            <td><strong>Type</strong></td>
            <td>Quiz / Exam / Project / Assignment</td>
          </tr>
          <tr>
            <td><strong>Due Date</strong></td>
            <td>Type // to add date</td>
          </tr>
          <tr>
            <td><strong>Points</strong></td>
            <td>Total points possible</td>
          </tr>
          <tr>
            <td><strong>Learning Objectives</strong></td>
            <td>What this assesses</td>
          </tr>
          <tr>
            <td><strong>Submission Format</strong></td>
            <td>How students submit</td>
          </tr>
        </tbody>
      </table>
      <h2>📝 Instructions</h2>
      <p>Clear directions for students</p>
      <h2>📊 Rubric</h2>
      <p>Grading criteria and point distribution</p>
      <h2>💡 Tips for Success</h2>
      <p>Guidance for students</p>
    `,
  },
}

export type TemplateKey = keyof typeof courseTemplates
