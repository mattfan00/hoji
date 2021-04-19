import React, { useContext } from "react"
import { queryClient } from "../Util/queryClient"
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
  username,
  createdAt,
  type,
  content,
  title,
  description,
  photos,
  expanded,
}) => {
  const { user } = useContext(AuthContext)
  const history = useHistory()
   
  const deleteEntry = async () => {
    try {
      await axios.delete(`/entry/${id}`)

      if (expanded) {
        // go back to user profile if delete
        history.push(`/${username}`)
      } else {
        // invalidate the query so that the profile page is reloaded
        queryClient.invalidateQueries(`/user/${user}`)
      }
    } catch(err) {}
  }

  return (
    <div className="mb-12 relative">
      <EntryHeader
        id={id}
        username={username}
        createdAt={createdAt}
      />

      {user?.username === username ? (
      <Dropdown 
        className="absolute -top-1 right-0"
        variant="text"
        size="sm"
        direction="left"
      >
        <Dropdown.Button>
          <FontAwesomeIcon className="text-gray-400" size="lg" icon="ellipsis-h" />
        </Dropdown.Button>

        <Dropdown.Item href={`/entry/${id}/edit`}>
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
