import React from "react"
import CustomInput from "../CustomInput"
import CustomEditor from "../CustomEditor/CustomEditor"

const EditPost = ({
  editor,
  editorState,
  setEditorState,
  onTitleChange,
  onContentChange,
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
        charLimit={100}
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
        onChange={onContentChange}
        setEditorState={setEditorState}
      />
    </>
  )
}

export default EditPost
