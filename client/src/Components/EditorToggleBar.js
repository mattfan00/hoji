import React from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dropdown from "./Dropdown"

const INLINE_STYLES = [
  { label: 'B', style: 'BOLD', className: "font-semibold" },
  { label: 'I', style: 'ITALIC', className: "italic" },
  { label: 'U', style: 'UNDERLINE', className: "underline" },
  // { label: <FontAwesomeIcon icon="  " />, style: 'CODE' }
]

const InlineStyleControls = ({
  editorState,
  onToggle,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <div className="flex">
      {INLINE_STYLES.map(({ label, style, className }) => (
        <Button
          type="text"
          size="sm"
          className={`mr-1 ${className ? className : ""}`}
          onMouseDown={(e) => {
            e.preventDefault()
            onToggle(style)
          }}
          active={currentStyle.has(style)}
        >{label}</Button>
      ))}
    </div>
  )
}

const BLOCK_TYPES = [
  { label: <FontAwesomeIcon icon="list-ul" />, style: 'unordered-list-item' },
  { label: <FontAwesomeIcon icon="list-ol" />, style: 'ordered-list-item' },
  // { label: "H1", style: 'header-one' },
  // { label: "H2", style: 'header-two' },
  // { label: "H3", style: 'header-three' },
]

const BlockStyleControls = ({
  editorState,
  onToggle,
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="flex">
      {BLOCK_TYPES.map(({ label, style }) => (
        <Button
          type="text"
          size="sm"
          className="mr-1"
          onMouseDown={(e) => {
            e.preventDefault()
            onToggle(style)
          }}
          active={style === blockType}
        >{label}</Button>
      ))}
    </div>
  )
}

const HEADING_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
]

const HeadingStyleControls = ({
  editorState,
  onToggle,
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    // <Dropdown
    //   type="text"
    //   size="sm"
    //   className="mr-1"
    // >
    //   <Dropdown.Button>
    //     Text
    //     <FontAwesomeIcon className="ml-1.5" icon="chevron-down" size="xs" />
    //   </Dropdown.Button>

    //   <Dropdown.Item>Text</Dropdown.Item>
    //   {HEADING_TYPES.map(({ label, style }) => (
    //     <Dropdown.Item
    //       onMouseDown={(e) => {
    //         e.preventDefault()
    //         onToggle(style)
    //       }}
    //     >{label}</Dropdown.Item>
    //   ))}
    // </Dropdown>
    <div className="flex">
      {HEADING_TYPES.map(({ label, style }) => (
        <Button
          type="text"
          size="sm"
          className="mr-1"
          onMouseDown={(e) => {
            e.preventDefault()
            onToggle(style)
          }}
          active={style === blockType}
        >{label}</Button>
      ))}
    </div>
  )
}

const EditorToggleBar = ({
  editorState,
  onInlineToggle,
  onBlockToggle,
}) => {
  return (
    <div className="flex flex-wrap sticky top-3 z-10 p-1 bg-white mb-4 border border-solid shadow-sm rounded-lg">

      <InlineStyleControls
        editorState={editorState}
        onToggle={onInlineToggle}
      />

      <BlockStyleControls
        editorState={editorState}
        onToggle={onBlockToggle}
      />

      <HeadingStyleControls
        editorState={editorState}
        onToggle={onBlockToggle}
      />
    </div>
  )
}

export default EditorToggleBar