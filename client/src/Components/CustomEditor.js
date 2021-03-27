import React, { useState } from "react"
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import EditorToggleBar from "./EditorToggleBar";

const CustomEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

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

  const myStyle = (contentBlock) => {
    const type = contentBlock.getType()
    // console.log(type)
  }

  const onInlineToggle = (inlineStyle) => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
    setEditorState(newState)
  }

  const onBlockToggle = (blockType) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType)
    setEditorState(newState);
  }

  return (
    <div className="relative">
      <EditorToggleBar
        editorState={editorState}
        onInlineToggle={onInlineToggle}
        onBlockToggle={onBlockToggle}
      />
      <Editor
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={styleMap}
        blockStyleFn={myStyle}
        placeholder="start writing your post here..."
        spellCheck={true}
      />
    </div>

  )

}

export default CustomEditor