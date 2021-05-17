import React, { useState, useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { queryClient } from "../../Utils/queryClient"
import { useHistory } from "react-router-dom"
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { AuthContext } from "../../Context/AuthContext"
import EntryHeader from "./EntryHeader"
import SelectNew from "../SelectNew"
import Button from "../Button"
import EditPost from "./EditPost"
import EditThought from "./EditThought"
import FadeAnimation from "../FadeAnimation"
import decorator from "../CustomEditor/decorator"
import axios from "axios"

const EntryBuilder = ({
  editing
}) => {
  const submitMutation = useMutation(newEntry => axios.post("/entry", newEntry), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/user/${user.username}`)
      history.push(`/${user.username}`)
    }
  })

  const updateMutation = useMutation(updatedEntry => axios.put(`/entry/${id}`, updatedEntry), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/user/${user.username}`)
      history.push(`/${user.username}`)
    }
  })

  const [type, setType] = useState("post")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const initialTitle = useRef(null)

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator))
  const editor = useRef(null)

  const { user } = useContext(AuthContext)
  const history = useHistory()
  const charLimit = 280

  const { id } = useParams()

  const { data: entry, isloading } = useQuery(`/entry/${id}`, {
    enabled: editing,
    onSuccess: (data) => {
      setType(data.type)
      setTitle(data.title || "")
      initialTitle.current = data.title || ""
      setContent(data.content || "")
      if (data.type === "post") {
        const contentState = convertFromRaw(JSON.parse(data.content))
        setEditorState(EditorState.createWithContent(contentState, decorator))
      }
    }
  }) 

  const handleTypeChange = (newType) => {
    if (newType !== type) {
      setTitle("")
      setContent("")
      setEditorState(() => EditorState.createEmpty())
      setType(newType)
    }
  }

  const cancel = () => history.push(`/${user.username}`)

  const handleTitleChange = (value) => setTitle(value)

  const handleContentChange = (value) => setContent(value)

  const renderType = () => {
    switch(type) {
      case "post":
        return <EditPost 
          editor={editor}
          editorState={editorState}
          setEditorState={setEditorState}
          onTitleChange={handleTitleChange} 
          initialTitle={initialTitle.current}
        />
      case "thought":
        return <EditThought 
          onContentChange={handleContentChange} 
          initial={content}
        />
      default:
        return ""
    }
  }

  const submitDisabled = () => {
    switch(type) {
      case "post":
        return !editorState.getCurrentContent().hasText()
      case "thought":
        return content.length === 0 || content.length > charLimit
    }
  }

  const submit = async () => {
    const body = {
      type,
      title,
      content: type === "post" ? (
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      ) : content
    }

    // if editing, then update
    // else, submit a new entry
    if (editing) {
      updateMutation.mutate(body)
    } else {
      submitMutation.mutate(body)
    }
  }

  return (
    <div className="h-full">
      {/*
      <SelectNew 
        active={type} 
        onChange={handleTypeChange}
      />
      */}

      <EntryHeader 
        username={editing ? entry?.user.username : user?.username}
        createdAt={entry?.created_at}
      />
      
      <div className="mb-16">
        {renderType()}
      </div>

      <div className="flex justify-end items-center">
        <div className="flex">
          <Button 
            className="mr-2"
            onClick={cancel}
          >Cancel</Button>
          <Button
            variant="primary"
            disabled={submitDisabled()}
            onClick={submit}
          >{editing ? "Update" : "Submit"}</Button>
        </div>

        {type === "thought" ? (
        <FadeAnimation show={charLimit - content.length <= 20}>
          <span className={`font-semibold${content.length > charLimit ? " text-red-500" : ""}`}>{content.length} </span>
          / {charLimit}
        </FadeAnimation>
        ) : ""}
      </div>
    </div>
  )
}

export default EntryBuilder
