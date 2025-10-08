export default function About() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">About This Project</h1>
      <p className="text-lg text-gray-600 mb-6">
        This is a Next.js application with collaborative editing powered by Liveblocks.
      </p>
      <div className="p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Next.js 15 (App Router)</li>
          <li>React 19</li>
          <li>Liveblocks (Collaborative Editing)</li>
          <li>Tiptap Editor</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>
    </div>
  )
}
