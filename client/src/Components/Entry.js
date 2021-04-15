import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import EntryHeader from "./Entry/EntryHeader"
import Thought from "./Entry/Thought"
import Post from "./Entry/Post"
import Gallery from "./Entry/Gallery"
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dropdown from "./Dropdown"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"

const Entry = ({
  id,
  user,
  createdAt,
  type,
  content,
  title,
  description,
  photos,
  expanded,
  onDelete,
}) => {
  const { user: currUser } = useContext(AuthContext)
  const history = useHistory()
   
  const deleteEntry = async () => {
    try {
      await axios.delete(`/entry/${id}`)

      if (onDelete) {
        // used when viewing entry from profile page
        onDelete(id)
      } else {
        // used when viewing entry from entry view
        history.push(`/${user}`)
      }
    } catch(err) {}
  }

  return (
    <div className="mb-12 relative">
      <EntryHeader
        id={id}
        user={user}
        createdAt={createdAt}
        onDelete={onDelete}
      />

      {currUser?.username === user ? (
      <Dropdown 
        className="absolute -top-1 right-0"
        variant="text"
        size="sm"
        direction="left"
      >
        <Dropdown.Button>
          <FontAwesomeIcon className="text-gray-400" size="lg" icon="ellipsis-h" />
        </Dropdown.Button>

        <Dropdown.Item href={`/${'hello'}`}>
          <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "edit"]} />
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={deleteEntry}>
          <span className="text-red-500">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "trash-alt"]} />
            Delete
          </span>
        </Dropdown.Item>
      </Dropdown>
      ) : ""}

      {/* display thought */}
      {type === "thought" ? (
        <Thought 
          content={content} 
        />
      ) : ""}

      {/* display post */}
      {type === "post" ? (
        <Post 
          title={title} 
          description={description} 
          content={content}
          expanded={expanded} 
        />
      ) : ""}

      {/* display gallery */}
      {type === "gallery" ? (
        <Gallery 
          content={content} 
          photos={photos} 
          expanded={expanded}
        />
      ) : ""}
    </div>
  )
}

export default Entry
