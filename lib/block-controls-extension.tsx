import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

export const BlockControls = Extension.create({
  name: "blockControls",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("blockControls"),
        props: {
          decorations: (state) => {
            const { doc } = state
            const decorations: Decoration[] = []

            doc.descendants((node, pos) => {
              if (
                node.isBlock &&
                node.type.name !== "doc" &&
                node.type.name !== "tableRow" &&
                node.type.name !== "tableCell" &&
                node.type.name !== "tableHeader"
              ) {
                const decoration = Decoration.widget(pos, () => {
                  const container = document.createElement("div")
                  container.className = "block-controls"
                  container.contentEditable = "false"

                  // Plus button
                  const plusBtn = document.createElement("button")
                  plusBtn.className =
                    "w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-400 hover:bg-gray-800 rounded transition-colors"
                  plusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
                  plusBtn.onclick = (e) => {
                    e.preventDefault()
                    // Add new paragraph after current block
                    const tr = state.tr.insert(pos + node.nodeSize, state.schema.nodes.paragraph.create())
                    this.editor.view.dispatch(tr)
                  }

                  // Drag handle
                  const dragBtn = document.createElement("button")
                  dragBtn.className =
                    "w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-400 hover:bg-gray-800 rounded transition-colors cursor-grab active:cursor-grabbing"
                  dragBtn.draggable = true
                  dragBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>`

                  container.appendChild(plusBtn)
                  container.appendChild(dragBtn)

                  return container
                })

                decorations.push(decoration)
              }
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
