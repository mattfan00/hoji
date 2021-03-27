import React from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dropdown from "./Dropdown"

const EditorToggleBar = ({
  bold,
  italic,
  underline,
  h1,
  h2,
  h3,
  ul,
  ol,
}) => {
  return (
    <div className="flex sticky top-3 z-10 p-1 bg-white mb-3 border border-solid shadow-sm rounded-lg">
      <Button
        type="text"
        size="sm"
        className="font-semibold mr-1"
        onMouseDown={bold}
      >B</Button>
      <Button
        type="text"
        size="sm"
        className="italic mr-1"
        onMouseDown={italic}
      >I</Button>
      <Button
        type="text"
        size="sm"
        className="underline mr-1"
        onMouseDown={underline}
      >U</Button>
      <Button
        type="text"
        size="sm"
        className="mr-1"
        onMouseDown={ul}
      ><FontAwesomeIcon icon="list-ul" /></Button>
      <Button
        type="text"
        size="sm"
        className="mr-1"
        onMouseDown={ol}
      ><FontAwesomeIcon icon="list-ol" /></Button>

      <Dropdown
        type="text"
        size="sm"
        className="mr-1"
      >
        <Dropdown.Button>
          Text
          <FontAwesomeIcon className="ml-1.5" icon="chevron-down" size="xs" />
        </Dropdown.Button>

        <Dropdown.Item>Text</Dropdown.Item>
        <Dropdown.Item>Heading 1</Dropdown.Item>
        <Dropdown.Item>Heading 2</Dropdown.Item>
        <Dropdown.Item>Heading 3</Dropdown.Item>
      </Dropdown>

    </div>
  )
}

export default EditorToggleBar