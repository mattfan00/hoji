import React from "react"
import Button from "../Button"
import Link from "./Link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const INLINE_STYLES = [
  { label: 'B', style: 'BOLD', className: "font-semibold" },
  { label: 'I', style: 'ITALIC', className: "italic" },
  { label: 'U', style: 'UNDERLINE', className: "underline" },
  // { label: <FontAwesomeIcon icon="  " />, style: 'CODE' }
]

const InlineStyleControls = ({
  editor,
  editorState,
  onToggle,
  onLinkToggle
}) => {
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <div className="flex">
      {INLINE_STYLES.map(({ label, style, className }) => (
        <Button
          key={className}
          variant="text"
          size="sm"
          className={`mr-1 ${className ? className : ""}`}
          onMouseDown={(e) => {
            e.preventDefault()
            onToggle(style)
          }}
          active={currentStyle.has(style)}
        >{label}</Button>
      ))}
      <Link 
        editor={editor}
        editorState={editorState} 
        onLinkToggle={onLinkToggle}
      />
    </div>
  )
}

const BLOCK_TYPES = [
  { label: <FontAwesomeIcon icon="list-ul" />, style: 'unordered-list-item' },
  { label: <FontAwesomeIcon icon="list-ol" />, style: 'ordered-list-item' },
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
          key={style}
          variant="text"
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
    <div className="flex">
      {HEADING_TYPES.map(({ label, style }) => (
        <Button
          key={style}
          variant="text"
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
  editor,
  editorState,
  onInlineToggle,
  onBlockToggle,
  onLinkToggle
}) => {
  return (
    <div className="flex flex-wrap sticky top-3 z-10 p-1 bg-white mb-4 border border-solid shadow-sm rounded-md">

      <InlineStyleControls
        editor={editor}
        editorState={editorState}
        onToggle={onInlineToggle}
        onLinkToggle={onLinkToggle}
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
