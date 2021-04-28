import React, { useState, useEffect, useContext, useRef } from "react"
import { useQuery, useMutation } from "react-query"
import { queryClient } from "../Utils/queryClient"
import { AuthContext } from "../Context/AuthContext"
import { useParams, useHistory } from "react-router-dom"
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import EntryHeader from "../Components/Entry/EntryHeader"
import Button from "../Components/Button"
import EditPost from "../Components/Entry/EditPost"
import EditThought from "../Components/Entry/EditThought"
import FadeAnimation from "../Components/FadeAnimation"
import axios from "axios"

const EditEntry = () => {
  const entryMutation = useMutation(updatedEntry => axios.put(`/entry/${id}`, updatedEntry), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/user/${user.username}`)
      queryClient.invalidateQueries(`/entry/${id}`)
        
      history.push(`/${user.username}`)
    }
  })

  const [type, setType] = useState("post")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const initialTitle = useRef(null)

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const editor = useRef(null)

  const { user } = useContext(AuthContext)
  const history = useHistory()
  const charLimit = 280

  const { id } = useParams()

  const { data: entry, isLoading } = useQuery(`/entry/${id}`, {
    onSuccess: (data) => {
      setType(data.type)
      setTitle(data.title || "")
      if (!data.title) {
        console.log("go to second case")
      } else {
        console.log(data.title.length)
        console.log("use first case")
      }
      initialTitle.current = data.title || ""
      setDescription(data.description || "")
      setContent(data.content || "")
      if (data.type === "post") {
        const contentState = convertFromRaw(JSON.parse(data.content))
        setEditorState(EditorState.createWithContent(contentState))
      }
    }
  }) 

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
          initialTitle={initialTitle.current}
          initialDescription={description}
        />
      case "thought":
        return <EditThought 
          onContentChange={handleContentChange} 
          initial={content}
        />
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

  const update = async () => {
    entryMutation.mutate({
      title,
      description,
      content: type === "post" ? (
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      ) : content
    })
  }

  return (
    <>
      <EntryHeader 
        username={entry?.user.username}
        createdAt={entry?.created_at}
      />

      <div className="mb-16">
        {!isLoading ? renderType() : ""}
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
            onClick={update}
          >Update</Button>
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

export default EditEntry
