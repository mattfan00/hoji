import React from "react"
import { useSlate } from "slate-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../Button"
import Media from "./Media"
import { isInlineActive, toggleInline, isBlockActive, toggleBlock } from "../Utils"

const INLINE_STYLES = [
  { label: "B", format: "bold" },
  { label: "I", format: "italic" },
  { label: "U", format: "underline" },
]

const BLOCK_STYLES = [
  { label: <FontAwesomeIcon icon="list-ul" />, format: "bulleted-list" },
  { label: <FontAwesomeIcon icon="list-ol" />, format: "numbered-list" },
  { label: "H", format: "heading" },
]

const Toolbar = () => {
  const editor = useSlate()

  return (
    <div className="flex flex-wrap sticky top-3 z-10 p-1 bg-white mb-4 border border-solid shadow-sm rounded-md">
      {INLINE_STYLES.map(({ label, format }) => (
        <Button
          variant="text"
          size="sm"
          className="mr-1"
          active={isInlineActive(editor, format)}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleInline(editor, format)
          }}
        >{label}</Button>
      ))}

      <Media />

      {BLOCK_STYLES.map(({ label, format }) => (
        <Button
          variant="text"
          size="sm"
          className="mr-1"
          active={isBlockActive(editor, format)}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock(editor, format)
          }}
        >{label}</Button>
      ))}
    </div>
  )
}

export default Toolbar
