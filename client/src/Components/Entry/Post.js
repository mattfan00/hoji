import React, { useState, useEffect } from "react"
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import decorator from "../CustomEditor/decorator"
import blockRenderer from "../CustomEditor/blockRenderer"

const Post = ({ 
  title,
  content,
  expanded,
}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator))

  const styleMap = {
    "BOLD": {
      fontWeight: 600
    }
  }

  useEffect(() => {
    if (content) {
      const contentState = convertFromRaw(JSON.parse(content))
      setEditorState(EditorState.createWithContent(contentState, decorator))
    }
  }, [content])

  return (
    <>
      <h2 className="mb-4 break-words">{title}</h2>
      {/*<div className={`${expanded ? "mb-12" : ""}`}>{description}</div>*/}
      {true ? (
        <div className={`entry-content ${!expanded ? "collapsed" : ""}`}>
          <Editor
            editorState={editorState}
            blockRendererFn={blockRenderer}
            customStyleMap={styleMap}
            readOnly={true}
          />
        </div>
      ) : ""}
    </>
  )
}

export default Post
