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
    console.log(type)
  }

  const _onBoldClick = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
  }

  const _onItalicClick = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
  }

  const _onUnderlineClick = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
  }

  const _onH1Click = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, "header-one"))
  }

  const _onH2Click = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, "header-two"))
  }

  const _onH3Click = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, "header-three"))
  }

  const _onULClick = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"))
  }

  const _onOLClick = (e) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"))
  }

  return (
    <div className="relative">
      <EditorToggleBar
        bold={_onBoldClick}
        italic={_onItalicClick}
        underline={_onUnderlineClick}
        h1={_onH1Click}
        h2={_onH2Click}
        h3={_onH3Click}
        ul={_onULClick}
        ol={_onOLClick}
      />
      <Editor
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={styleMap}
        blockStyleFn={myStyle}
        placeholder="start writing your post here..."
      />
    </div>

  )

}

export default CustomEditor