import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import dayjs from "dayjs"
import EntryHeader from "../Components/Entry/EntryHeader"
import SelectNew from "../Components/SelectNew"
import Button from "../Components/Button"
import EditPost from "../Components/Entry/EditPost"
import EditThought from "../Components/Entry/EditThought"
import EditGallery from "../Components/Entry/EditGallery"
import FadeAnimation from "../Components/FadeAnimation"
import axios from "axios"

const NewEntry = () => {
  const [type, setType] = useState("post")
  const [content, setContent] = useState("")
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const charLimit = 280

  const cancel = () => {
    history.push(`/${user.username}`)
  }

  const handleContentChange = (value) => {
    setContent(value)
  }

  const renderType = () => {
    switch(type) {
      case "post":
        return <EditPost />
      case "thought":
        return <EditThought onContentChange={handleContentChange} />
      case "gallery":
        return <EditGallery />
    }
  }

  const submitDisabled = () => {
    switch(type) {
      case "post":
        return false
      case "thought":
        return content.length === 0 || content.length > charLimit
    }
  }

  const submit = async () => {
    await axios.post("/entry", {
      type,
      content
    })

    history.push(`/${user.username}`)
  }

  return (
    <>
      <SelectNew 
        active={type} 
        onChange={(newType) => setType(newType)}
      />

      <EntryHeader 
        author={user?.username}
        created={dayjs().format()}
      />
      
      <div className="mb-16">
        {renderType()}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex">
          <Button
            className="mr-2"
            type="primary"
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
