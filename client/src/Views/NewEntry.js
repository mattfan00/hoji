import React, { useState, useContext, useRef } from "react"
import { useMutation } from "react-query"
import { queryClient } from "../Utils/queryClient"
import { useHistory } from "react-router-dom"
import { EditorState, convertToRaw } from 'draft-js';
import { AuthContext } from "../Context/AuthContext"
import EntryHeader from "../Components/Entry/EntryHeader"
import SelectNew from "../Components/SelectNew"
import Button from "../Components/Button"
import EditPost from "../Components/Entry/EditPost"
import EditThought from "../Components/Entry/EditThought"
import FadeAnimation from "../Components/FadeAnimation"
import axios from "axios"

const NewEntry = () => {
  const entryMutation = useMutation(newEntry => axios.post("/entry", newEntry), {
    onSuccess: () => {
      queryClient.invalidateQueries(`user/${user.username}`)
    }
  })

  const [type, setType] = useState("post")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const editor = useRef(null)

  const { user } = useContext(AuthContext)
  const history = useHistory()
  const charLimit = 280

  const handleTypeChange = (newType) => {
    console.log(newType, type)
    if (newType !== type) {
      setTitle("")
      setDescription("")
      setContent("")
      setEditorState(() => EditorState.createEmpty())
      setType(newType)
    }
  }

  const cancel = () => history.push(`/${user.username}`)

  const handleTitleChange = (value) => setTitle(value)

  const handleDescriptionChange = (value) => setDescription(value)

  const handleContentChange = (value) => {
    setContent(value)
  }

  const renderType = () => {
    switch(type) {
      case "post":
        return <EditPost 
          editor={editor}
          editorState={editorState}
          setEditorState={setEditorState}
          onTitleChange={handleTitleChange} 
          onDescriptionChange={handleDescriptionChange} 
        />
      case "thought":
        return <EditThought 
          onContentChange={handleContentChange} 
        />
    }
  }

  const submitDisabled = () => {
    switch(type) {
      case "post":
        return title.length === 0
      case "thought":
        return content.length === 0 || content.length > charLimit
    }
  }

  const submit = async () => {
    entryMutation.mutate({
      type,
      title,
      description,
      content: type === "post" ? (
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      ) : content
    })

    history.push(`/${user.username}`)
  }

  return (
    <>
      <SelectNew 
        active={type} 
        onChange={handleTypeChange}
      />

      <EntryHeader 
        username={user?.username}
      />
      
      <div className="mb-16">
        {renderType()}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex">
          <Button
            className="mr-2"
            variant="primary"
            disabled={submitDisabled()}
            onClick={submit}
          >Submit</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>

        {type === "thought" ? (
        <FadeAnimation show={charLimit - content.length <= 20}>
          <span className={`font-semibold${content.length > charLimit ? " text-red-500" : ""}`}>{content.length} </span>
          / {charLimit}
        </FadeAnimation>
        ) : ""}
      </div>
    </>
  )
}

export default NewEntry
