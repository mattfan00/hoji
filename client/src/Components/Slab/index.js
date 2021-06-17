import React, { useMemo, useState } from "react"
import { createEditor } from "slate"
import { Slate, Editable } from "slate-react"
import Element from "./Element"
import Leaf from "./Leaf"
import Toolbar from "./Toolbar/"
import withSlab from "./withSlab"
import { emptyBlock } from "./Utils"

const Slab = ({
  //value,
  //setValue,
}) => {
  const editor = useMemo(() => withSlab(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(() => emptyBlock())

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
      />
    </Slate>
  )
}

export default Slab
