import React from "react"
import CustomInput from "../CustomInput"
import CustomEditor from "../CustomEditor"

const EditPost = ({
  editor,
  editorState,
  setEditorState,
  onTitleChange,
  onDescriptionChange,
}) => {
  const handleTitleChange = (value) => {
    onTitleChange(value)
  }

  const handleDescriptionChange = (value) => {
    onDescriptionChange(value)
  }
  return (
    <>
      <CustomInput
        placeholder="give your post a title..."
        onChange={handleTitleChange}
        autofocus
        // initial="hey"
        tagName="h2"
      />

      <CustomInput
        className="mb-12"
        placeholder="give your post a description..."
        onChange={handleDescriptionChange}
        // initial="hey"
      />

      <CustomEditor
        editor={editor}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </>
  )
}

export default EditPost
