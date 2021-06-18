import React, { useMemo, useState } from "react"
import { createEditor, Transforms, Node } from "slate"
import { Slate, Editable } from "slate-react"
import isHotkey from "is-hotkey"
import Element from "./Element"
import Leaf from "./Leaf"
import Toolbar from "./Toolbar/"
import withSlab from "./withSlab"
import { HOTKEYS, toggleInline } from "./Utils"

const Slab = ({
  value,
  setValue,
}) => {
  const editor = useMemo(() => withSlab(createEditor()), [])

  const renderLeaf = (props) => <Leaf {...props} />
  const renderElement = (props) => <Element {...props} />

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Toolbar />
      <Editable 
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        placeholder="start writing your entry here..."
        
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const format = HOTKEYS[hotkey]
              toggleInline(editor, format)
            }
          }

          if (event.key === 'Enter') {
            const selectedElement = Node.descendant(editor, editor.selection.anchor.path.slice(0, -1));

            // Replace 'title' with the type of the element which you wish to "break out" from
            if (selectedElement.type === 'heading') {
              event.preventDefault();
              const selectedLeaf = Node.descendant(editor, editor.selection.anchor.path);

              if (selectedLeaf.text.length === editor.selection.anchor.offset) {
                Transforms.insertNodes(editor, {
                  type: 'paragraph',
                  children: [{text: '', marks: []}],
                });
              }
              else {
                Transforms.splitNodes(editor);
                Transforms.setNodes(editor, {type: 'paragraph'});
              }
            }
          }
        }}
      />
    </Slate>
  )
}

export default Slab
