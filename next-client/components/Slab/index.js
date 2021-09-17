import React, { useMemo, useState } from "react"
import { createEditor, Transforms, Node } from "slate"
import { Slate, Editable } from "slate-react"
import isHotkey from "is-hotkey"
import Element from "./Element"
import Leaf from "./Leaf"
import Toolbar from "./Toolbar"
import withSlab from "./withSlab"
import { HOTKEYS, toggleInline } from "./Utils"

const Slab = ({
  content,
  setContent,
  placeholder,
  autofocus,
}) => {
  const editor = useMemo(() => withSlab(createEditor()), [])

  const renderLeaf = (props) => <Leaf {...props} />
  const renderElement = (props) => <Element {...props} />

  return (
    <Slate
      editor={editor}
      value={content}
      onChange={newValue => setContent(newValue)}
    >
      <Toolbar />
      <Editable 
        className="prose"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        placeholder={placeholder}
        autofocus={autofocus}
        
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const format = HOTKEYS[hotkey]
              toggleInline(editor, format)
            }
          }

          if (event.key === "Enter") {
            const selectedElement = Node.descendant(editor, editor.selection.anchor.path.slice(0, -1));

            if (event.shiftKey === true ) {
              event.preventDefault()
              Transforms.insertText(editor, "\n")
            } else {
              // include the types of elements you want to break out from
              if (selectedElement.type === "heading" || selectedElement.type === "block-quote" || selectedElement.type === "code-block") {
                event.preventDefault()
                const selectedLeaf = Node.descendant(editor, editor.selection.anchor.path)

                if (selectedLeaf.text.length === editor.selection.anchor.offset) {
                  Transforms.insertNodes(editor, {
                    type: 'paragraph',
                    children: [{text: '', marks: []}],
                  })
                }
                else {
                  Transforms.splitNodes(editor)
                  Transforms.setNodes(editor, {type: 'paragraph'})
                }
              }
            }
          }
        }}
      />
    </Slate>
  )
}

export default Slab
