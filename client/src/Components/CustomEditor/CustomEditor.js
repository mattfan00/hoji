import React from "react"
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import EditorToggleBar from "./EditorToggleBar";

const CustomEditor = ({
  editor,
  editorState,
  setEditorState
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
        editorState={editorState}
        onInlineToggle={onInlineToggle}
        onBlockToggle={onBlockToggle}
        onLinkToggle={onLinkToggle}
      />
      <div className={className}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          placeholder="start writing your entry here..."
          spellCheck={true}
        />
      </div>
    </div>

  )
}

export default CustomEditor
