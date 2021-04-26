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
    if (true) {
      const contentState = convertFromRaw(JSON.parse(content))
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [])

  return (
    <>
      <h2 className="mb-4">{title}</h2>
      {/*<div className={`${expanded ? "mb-12" : ""}`}>{description}</div>*/}
      {true ? (
        <div className={`entry-content ${!expanded ? "collapsed" : ""}`}>
          <Editor
            editorState={editorState}
            customStyleMap={styleMap}
            readOnly={true}
          />
        </div>
      ) : ""}
    </>
  )
}

export default Post
