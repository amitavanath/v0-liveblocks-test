"use client"

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense"
import { Editor } from "@/components/Editor"
import { useSearchParams } from "next/navigation"

export default function EditorPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId") || "default-course"

  return (
    <div className="h-full bg-black">
      <LiveblocksProvider publicApiKey={"pk_dev_5YVIWSe0ghE_bnR9eQDA_VzQx7aJ0zwbEf-aDaqw-hYRGSN8ytqiCA0sP3TuD_ke"}>
        <RoomProvider id="my-room">
          <ClientSideSuspense fallback={<div className="p-8 text-gray-400">Loading editor...</div>}>
            <Editor />
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    </div>
  )
}
