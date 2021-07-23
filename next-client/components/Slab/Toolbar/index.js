import React from "react"
import { useSlate } from "slate-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../Button"
import Media from "./Media"
import Link from "./Link"
import { isInlineActive, toggleInline, isBlockActive, toggleBlock } from "../Utils"
import { BiCodeBlock, BiHeading } from "react-icons/bi"

const INLINE_STYLES = [
  { label: <FontAwesomeIcon icon="bold" />, format: "bold" },
  { label: <FontAwesomeIcon icon="italic" />, format: "italic" },
  { label: <FontAwesomeIcon icon="underline" />, format: "underline" },
  { label: <FontAwesomeIcon icon="code" />, format: "code" },
]

const BLOCK_STYLES = [
  { label: <FontAwesomeIcon icon="heading" />, format: "heading" },
  { label: <FontAwesomeIcon icon="list-ul" />, format: "bulleted-list" },
  { label: <FontAwesomeIcon icon="list-ol" />, format: "numbered-list" },
  { label: <FontAwesomeIcon icon="quote-right" />, format: "block-quote" },
  { label: <BiCodeBlock size="1.5em" />, format: "code-block" },
]

const Toolbar = () => {
  const editor = useSlate()

  return (
    <div className="flex flex-wrap sticky top-0 z-10 p-1 bg-white mb-4 border-b">
      {INLINE_STYLES.map(({ label, format }) => (
        <Button
          key={format}
          variant="text"
          size="sm"
          className="mr-1"
          active={isInlineActive(editor, format)}
          disabled={isBlockActive(editor, "image")}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleInline(editor, format)
          }}
        >{label}</Button>
      ))}

      <Link />

      {BLOCK_STYLES.map(({ label, format }) => (
        <Button
          key={format}
          variant="text"
          size="sm"
          className="mr-1"
          active={isBlockActive(editor, format)}
          disabled={isBlockActive(editor, "image")}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock(editor, format)
          }}
        >{label}</Button>
      ))}

      <Media />
    </div>
  )
}

export default Toolbar
