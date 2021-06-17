import React from "react"
import { useSlate } from "slate-react"
import Button from "../Button"
import { toggleBlock } from "./Utils"

const BLOCK_STYLES = [
  { label: "H", format: "heading" }
]

const Toolbar = () => {
  const editor = useSlate()

  return (
    <div className="flex flex-wrap sticky top-3 z-10 p-1 bg-white mb-4 border border-solid shadow-sm rounded-md">
      {BLOCK_STYLES.map(({ label, format }) => (
        <Button
          variant="text"
          size="sm"
          className="mr-1"
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
