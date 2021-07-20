import React, { useState, useEffect, useMemo } from "react"
import { createEditor } from "slate"
import { Slate, Editable } from "slate-react"
import withSlab from "../Slab/withSlab"
import Leaf from "../Slab/Leaf"
import Element from "../Slab/Element"

const Post = ({ 
  title,
  content,
  expanded,
}) => {
  const editor = useMemo(() => withSlab(createEditor()), [])

  const renderLeaf = (props) => <Leaf {...props} />
  const renderElement = (props) => <Element {...props} />

  /*
  useEffect(() => {
    if (content) {
      const contentState = convertFromRaw(JSON.parse(content))
      setEditorState(EditorState.createWithContent(contentState, decorator))
    }
  }, [content])
  */

  return (
    <>
      {title ? (
        <h2 className="mb-4 break-words">{title}</h2>
      ) : ""}
      {/*<div className={`${expanded ? "mb-12" : ""}`}>{description}</div>*/}
      {true ? (
        <div className={`entry-content ${!expanded ? "collapsed" : ""}`}>
          <Slate editor={editor} value={JSON.parse(content)}>
            <Editable 
              className="prose"
              readOnly 
              renderLeaf={renderLeaf}
              renderElement={renderElement}
            />
          </Slate>
        </div>
      ) : ""}
    </>
  )
}

export default Post
