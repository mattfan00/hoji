import React, { useState, useContext, useRef, useEffect } from "react"
import { useMutation, useQuery } from "react-query"
import { queryClient } from "../../Utils/queryClient"
import { useHistory, useParams } from "react-router-dom"
import { emptyBlock, trimEnd, hasText } from "../Slab/Utils"
import { AuthContext } from "../../Context/AuthContext"
import EntryHeader from "./EntryHeader"
import SelectNew from "../SelectNew"
import Button from "../Button"
import EditPost from "./EditPost"
import EditThought from "./EditThought"
import FadeAnimation from "../FadeAnimation"
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

  const [value, setValue] = useState(() => emptyBlock())
  

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
        setValue(JSON.parse(data.content))
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
        return !hasText(value)
      case "thought":
        return content.length === 0 || content.length > charLimit
    }
  }

  const submit = async () => {
    const body = {
      type,
      title,
      content: type === "post" ? (
        JSON.stringify(trimEnd(value))
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

      <div className="mb-16">
        {renderType()}
      </div>

      <div className="flex justify-end">
        <Button
          //variant="primary"
          className="w-full"
          disabled={submitDisabled()}
          onClick={() => submit()}
        >{editing ? "Update" : "Submit"}</Button>
      </div>
    </div>
  )
}

export default EntryBuilder
