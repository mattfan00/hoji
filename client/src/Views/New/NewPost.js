import React, { useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { EditorState, convertToRaw } from 'draft-js';
import Button from "../../Components/Button"
import CustomEditor from "../../Components/CustomEditor"
import CustomInput from "../../Components/CustomInput"
import SelectNew from "../../Components/SelectNew"

const NewPost = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const editor = useRef(null)
  const history = useHistory()

  const handleDescriptionChange = (value) => {
    setDescription(value)
  }

  const handleTitleChange = (value) => {
    setTitle(value)
  }

  const submit = () => {
    console.log(convertToRaw(editorState.getCurrentContent()))
    // history.push("/matt")
  }

  const cancel = () => {
    history.push("/matt")
  }

  return (
    <div>
      <SelectNew active="post" />

      <div className="flex mb-2 items-center">
        <div className="mr-4 text-xs font-medium">@mattfan00</div>
        <div className="mr-4 text-xs tracking-wide uppercase text-gray-400">Mar 21, 2021</div>
        {/* <div className="label">post</div> */}
      </div>

      <div className="mb-10">
        <CustomInput
          className="mb-2"
          placeholder="give your post a title..."
          onChange={handleTitleChange}
          autofocus
          // initial="hey"
          tagName="h2"
        />

        <CustomInput
          className="mb-10"
          placeholder="give your post a description..."
          onChange={handleDescriptionChange}
          // initial="hey"
        />

        <CustomEditor
          editor={editor}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex">
          <Button
            className="mr-2"
            type="primary"
            onClick={submit}
            // disabled={text.length == 0 || charLeft() < 0}
          >Submit</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default NewPost