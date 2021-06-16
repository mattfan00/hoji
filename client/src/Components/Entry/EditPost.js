import React from "react"
import CustomInput from "../CustomInput"
import CustomEditor from "../CustomEditor/CustomEditor"
import Slab from "../Slab/Slab"

const EditPost = ({
  value,
  setValue,
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
        charLimit={200}
      />

      {/*
      <CustomInput
        className="mb-12"
        placeholder="give your post a description..."
        onChange={handleDescriptionChange}
        initial={initialDescription}
      />
      */}

      {/*
      <CustomEditor
        editor={editor}
        editorState={editorState}
        onChange={onContentChange}
        setEditorState={setEditorState}
      />
      */}

      <Slab 
        value={value}
        setValue={setValue}
      />
    </>
  )
}

export default EditPost
