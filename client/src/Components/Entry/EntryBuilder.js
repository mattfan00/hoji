import React, { useState, useContext, useRef, useEffect, useMemo } from "react"
import { useMutation, useQuery } from "react-query"
import { queryClient } from "../../Utils/queryClient"
import { useHistory, useParams } from "react-router-dom"
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
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
  const [changed, setChanged] = useState(false)
  const initialTitle = useRef(null)

  /*
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator))
  const editor = useRef(null)
  */

  const [value, setValue] = useState([])
  

  const { user } = useContext(AuthContext)
  const history = useHistory()
  const charLimit = 280

  const { id } = useParams()

  const { data: entry, isLoading } = useQuery(`/entry/${id}`, {
    enabled: editing ? true : false,
    onSuccess: (data) => {
      // check if user is allowed to edit the entry
      if (user.id != data.user_id) {
        history.push(`/entry/${id}`)
      }

      setType(data.type)
      setTitle(data.title || "")
      initialTitle.current = data.title || ""
      setContent(data.content || "")
      if (data.type === "post") {
        //const contentState = convertFromRaw(JSON.parse(data.content))
        //setEditorState(EditorState.createWithContent(contentState, decorator))
      }
    }
  }) 

  /*
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (changed) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [changed])
  */


  /*
  const handleTypeChange = (newType) => {
    if (newType !== type) {
      setTitle("")
      setContent("")
      setEditorState(() => EditorState.createEmpty())
      setType(newType)
    }
  }
  */

  const handleTitleChange = (value) => {
    setTitle(value)
    setChanged(true)
  }

  const handlePostContentChange = () => setChanged(true)

  const handleThoughtContentChange = (value) => setContent(value)

  const renderType = () => {
    switch(type) {
      case "post":
        return <EditPost 
          value={value}
          setValue={setValue}
          onTitleChange={handleTitleChange} 
          onContentChange={handlePostContentChange}
          initialTitle={initialTitle.current}
        />
      case "thought":
        return <EditThought 
          onContentChange={handleThoughtContentChange} 
          initial={content}
        />
      default:
        return ""
    }
  }

  const submitDisabled = () => {
    switch(type) {
      case "post":
        //return !editorState.getCurrentContent().hasText()
      case "thought":
        return content.length === 0 || content.length > charLimit
    }
  }

  const submit = async () => {
    const body = {
      type,
      title,
      content: type === "post" ? (
        ""
        //JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      ) : content,
    }

    // if editing, then update
    // else, submit a new entry
    if (editing) {
      updateMutation.mutate(body)
    } else {
      submitMutation.mutate(body)
    }
  }

  if (editing && isLoading) {
    return <></>
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
        author={editing ? entry?.user : user}
        //username={editing ? entry?.user.username : user?.username}
        createdAt={entry?.created_at}
      />
      
      <div className="mb-16">
        {renderType()}
      </div>

      <div className="flex justify-end items-center">
        <div className="flex">
          {/*
          <Button 
            className="mr-2"
            disabled={!changed}
            onClick={() => submit(false)}
          >Save Draft</Button>
          */}
          <Button
            variant="primary"
            disabled={submitDisabled()}
            onClick={() => submit()}
          >{editing ? "Update" : "Post"}</Button>
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
