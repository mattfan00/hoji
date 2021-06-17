import React, { useMemo, useState } from 'react'
import { Editor, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Element from "./Element"
import Toolbar from "./Toolbar"

const emptyState = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const Slab = ({
  //value,
  //setValue,
}) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(emptyState)

  const renderElement = (props) => <Element {...props} />

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Toolbar />
      <Editable 
        renderElement={renderElement}
        placeholder="start writing your entry here..."
        onKeyDown={event => {
          if (event.key === 'h') {
            event.preventDefault()
            Transforms.setNodes(
              editor,
              { type: 'heading' },
              { match: n => Editor.isBlock(editor, n) }
            )
          }
        }}
      />
    </Slate>
  )
}

export default Slab
