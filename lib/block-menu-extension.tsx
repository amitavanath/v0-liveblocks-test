import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

export const BlockMenuExtension = Extension.create({
  name: "blockMenu",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("blockMenu"),
        props: {
          decorations: (state) => {
            const { doc } = state
            const decorations: Decoration[] = []

            // Add decorations to block-level nodes
            doc.descendants((node, pos) => {
              // Only add to block-level nodes
              if (
                node.isBlock &&
                node.type.name !== "doc" &&
                node.type.name !== "tableRow" &&
                node.type.name !== "tableCell" &&
                node.type.name !== "tableHeader"
              ) {
                const decoration = Decoration.widget(
                  pos,
                  () => {
                    const wrapper = document.createElement("div")
                    wrapper.className = "block-menu-wrapper"
                    wrapper.contentEditable = "false"

                    const menu = document.createElement("div")
                    menu.className = "block-menu"

                    const addBtn = document.createElement("button")
                    addBtn.className = "block-menu-btn"
                    addBtn.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    `
                    addBtn.onclick = (e) => {
                      e.preventDefault()
                      e.stopPropagation()

                      // Dispatch custom event to show block menu
                      const rect = addBtn.getBoundingClientRect()
                      const event = new CustomEvent("showBlockMenu", {
                        detail: {
                          x: rect.right + 8,
                          y: rect.top,
                          pos: pos,
                        },
                      })
                      window.dispatchEvent(event)
                    }
                    // </CHANGE>

                    // Drag button
                    const dragBtn = document.createElement("button")
                    dragBtn.className = "block-menu-btn drag-handle"
                    dragBtn.draggable = true
                    dragBtn.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="5" r="1"></circle>
                        <circle cx="9" cy="12" r="1"></circle>
                        <circle cx="9" cy="19" r="1"></circle>
                        <circle cx="15" cy="5" r="1"></circle>
                        <circle cx="15" cy="12" r="1"></circle>
                        <circle cx="15" cy="19" r="1"></circle>
                      </svg>
                    `

                    menu.appendChild(addBtn)
                    menu.appendChild(dragBtn)
                    wrapper.appendChild(menu)

                    return wrapper
                  },
                  {
                    side: "left",
                    key: `block-menu-${pos}`,
                  },
                )

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
