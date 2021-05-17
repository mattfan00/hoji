import React from "react"
import CustomInput from "../CustomInput"
import CustomEditor from "../CustomEditor/CustomEditor"

const EditPost = ({
  editor,
  editorState,
  setEditorState,
  onTitleChange,
  initialTitle, 
}) => {
  const handleTitleChange = (value) => {
    onTitleChange(value)
  }

  return (
    <>
      <CustomInput
        className="mb-8"
        placeholder="give your entry a title..."
        onChange={handleTitleChange}
        initial={initialTitle}
        tagName="h2"
      />

      {/*
      <CustomInput
        className="mb-12"
        placeholder="give your post a description..."
        onChange={handleDescriptionChange}
        initial={initialDescription}
      />
      */}

      <CustomEditor
        editor={editor}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </>
  )
}

export default EditPost
