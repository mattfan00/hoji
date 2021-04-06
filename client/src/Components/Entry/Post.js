import React, { useState, useEffect } from "react"
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const Post = ({ 
  title,
  description,
  content,
  expanded,
}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const styleMap = {
    "BOLD": {
      fontWeight: 600
    }
  }

  useEffect(() => {
    if (expanded) {
      const contentState = convertFromRaw(JSON.parse(content))
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [])

  return (
    <div>
      <h2>{title}</h2>
      <div className={`${expanded ? "mb-12" : ""}`}>{description}</div>
      {expanded ? (
        <Editor
          editorState={editorState}
          customStyleMap={styleMap}
          readOnly={true}
        />
      ) : ""}
    </div>
  )
}

export default Post
