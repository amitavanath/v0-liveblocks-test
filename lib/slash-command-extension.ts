import { Extension } from "@tiptap/core"
import { Suggestion } from "@tiptap/suggestion"
import { ReactRenderer } from "@tiptap/react"
import tippy from "tippy.js"
import { SlashCommandMenu, getSuggestionItems } from "@/components/SlashCommandMenu"

export const SlashCommand = Extension.create({
  name: "slashCommand",

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        items: ({ query, editor }) => {
          return getSuggestionItems({ query, editor })
        },
        render: () => {
          let component: ReactRenderer
          let popup: any

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(SlashCommandMenu, {
                props: {
                  items: props.items,
                  command: (item: any) => {
                    props.command(item)
                  },
                },
                editor: props.editor,
              })

              if (!props.clientRect) {
                return
              }

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              })
            },

            onUpdate(props: any) {
              component.updateProps({
                items: props.items,
                command: (item: any) => {
                  props.command(item)
                },
              })

              if (!props.clientRect) {
                return
              }

              popup[0]?.setProps({
                getReferenceClientRect: props.clientRect,
              })
            },

            onKeyDown(props: any) {
              if (props.event.key === "Escape") {
                popup[0]?.hide()
                return true
              }

              return component.ref?.onKeyDown(props)
            },

            onExit() {
              popup[0]?.destroy()
              component.destroy()
            },
          }
        },
      }),
    ]
  },
})
