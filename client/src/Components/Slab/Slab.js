import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable 
        placeholder="start writing your entry here..."
        onKeyDown={event => {
          if (event.key === '&') {
            event.preventDefault()
            editor.insertText('and')
          }
        }}
      />
    </Slate>
  )
}

export default Slab
