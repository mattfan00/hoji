import React, { useState, useEffect, useContext, useRef } from "react"
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
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState("post")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const editor = useRef(null)

  const { user } = useContext(AuthContext)
  const history = useHistory()
  const charLimit = 280

  const { id } = useParams()

  useEffect(() => {
    const getEntry = async () => {
      const entryResult = await axios.get(`/entry/${id}`)
      const { data } = entryResult
      console.log(data)

      setType(data.type)
      setTitle(data.title || "")
      setDescription(data.description || "")
      setContent(data.content || "")
      if (data.type === "post") {
        const contentState = convertFromRaw(JSON.parse(data.content))
        setEditorState(EditorState.createWithContent(contentState))
      }
      setLoading(false)
    }

    getEntry()
  }, [])

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
          initialTitle={title}
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
        return title.length === 0
      case "thought":
        return content.length === 0 || content.length > charLimit
    }
  }

  const submit = async () => {
    await axios.put("/entry/${id}", {
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
      <EntryHeader 
        user={user?.username}
      />

      <div className="mb-16">
        {!loading ? renderType() : ""}
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

export default EditEntry
