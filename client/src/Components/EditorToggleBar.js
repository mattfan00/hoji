import React from "react"
import Button from "./Button"

const EditorToggleBar = ({
  bold,
  italic,
  underline,
  h1,
  h2,
  h3,
  ul,
  ol,
  codeBlock,
}) => {
  return (
    <div className="sticky top-3 z-10 shadow-md bg-gray-100 mb-5 rounded-lg">
      <Button className="font-semibold" onMouseDown={bold}>Bold</Button>
      <Button className="italic" onMouseDown={italic}>Italic</Button>
      <Button className="underline" onMouseDown={underline}>Underline</Button>
      <Button onMouseDown={h1}>H1</Button>
      <Button onMouseDown={h2}>H2</Button>
      <Button onMouseDown={h3}>H3</Button>
      <Button onMouseDown={ul}>UL</Button>
      <Button onMouseDown={ol}>OL</Button>
      <Button onMouseDown={codeBlock}>Code block</Button>
    </div>
  )
}

export default EditorToggleBar