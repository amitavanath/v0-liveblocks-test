"use client"

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense"
import { Editor } from "@/components/Editor"

export default function EditorPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Collaborative Editor</h1>
      <LiveblocksProvider publicApiKey={"pk_dev_5YVIWSe0ghE_bnR9eQDA_VzQx7aJ0zwbEf-aDaqw-hYRGSN8ytqiCA0sP3TuD_ke"}>
        <RoomProvider id="my-room">
          <ClientSideSuspense fallback={<div>Loading editor...</div>}>
            <Editor />
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    </div>
  )
}
