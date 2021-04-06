import React, { useState, useRef, useContext } from "react"
import { useHistory } from "react-router-dom"
import { EditorState, convertToRaw } from 'draft-js';
import Button from "../../Components/Button"
import CustomEditor from "../../Components/CustomEditor"
import CustomInput from "../../Components/CustomInput"
import SelectNew from "../../Components/SelectNew"
import EntryHeader from "../../Components/Entry/EntryHeader"
import dayjs from "dayjs"
import { AuthContext } from "../../Context/AuthContext"

const NewPost = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const editor = useRef(null)
  const history = useHistory()
  const { user } = useContext(AuthContext)

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

      <EntryHeader 
        author={user?.username}
        created={dayjs().format()}
      />

      <div className="mb-20">
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
