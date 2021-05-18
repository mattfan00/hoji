import React from "react"
import { Editor, RichUtils, AtomicBlockUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import EditorToggleBar from "./EditorToggleBar"
import blockRenderer from "./blockRenderer"

const CustomEditor = ({
  editor,
  editorState,
  setEditorState,
  onChange,
}) => {
  const styleMap = {
    "BOLD": {
      fontWeight: 600
    }
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  const onEditorChange = (newEditorState) => {
    const currentContent = editorState.getCurrentContent()
    const newContent = newEditorState.getCurrentContent()

    // if the content has changed
    if (currentContent !== newContent) {
      onChange()
    }

    setEditorState(newEditorState)
  }

  const onInlineToggle = (inlineStyle) => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
    setEditorState(newState)
  }

  const onBlockToggle = (blockType) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType)
    setEditorState(newState);
  }

  const onLinkToggle = (newEditorState, entityKey) => {
    setEditorState(RichUtils.toggleLink(
      newEditorState, newEditorState.getSelection(), entityKey
    ))

    setTimeout(() => editor.current.focus(), 0)
  }

  const onMediaUpload = (newEditorState, entityKey) => {
    setEditorState(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    ))
  }

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  let contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== 'unstyled'
    ) {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div className="relative">
      <EditorToggleBar
        editor={editor}
        editorState={editorState}
        onInlineToggle={onInlineToggle}
        onBlockToggle={onBlockToggle}
        onLinkToggle={onLinkToggle}
        onMediaUpload={onMediaUpload}
      />
      <div className={className}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={onEditorChange}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={blockRenderer}
          customStyleMap={styleMap}
          placeholder="start writing your entry here..."
          spellCheck={true}
        />
      </div>
    </div>
  )
}

export default CustomEditor
