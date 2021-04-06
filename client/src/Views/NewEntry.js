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

const NewEntry = () => {
  const [type, setType] = useState("post")
  const { user } = useContext(AuthContext)
  const history = useHistory()

  const cancel = () => {
    history.push(`/${user}`)
  }

  const renderType = () => {
    switch(type) {
      case "post":
        return <EditPost />
      case "thought":
        return <EditThought />
      case "gallery":
        return <EditGallery />
    }
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
            // disabled={text.length == 0 || charLeft() < 0}
          >Submit</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </div>
    </>
  )
}

export default NewEntry
