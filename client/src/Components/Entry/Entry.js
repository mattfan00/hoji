import React, { useState, useContext } from "react"
import { useMutation } from "react-query"
import { queryClient } from "../../Utils/queryClient"
import { useHistory } from "react-router-dom"
import Modal from "react-modal"
import EntryHeader from "./EntryHeader"
import Thought from "./Thought"
import Post from "./Post"
import Gallery from "./Gallery"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dropdown from "../Dropdown"
import Button from "../Button"
import { AuthContext } from "../../Context/AuthContext"
import axios from "axios"

const Entry = ({
  id,
  onClick,
  author,
  createdAt,
  type,
  content,
  title,
  photos,
  expanded,
  community,
}) => {
  const deleteMutation = useMutation(() => axios.delete(`/entry/${id}`))
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { user } = useContext(AuthContext)
  const history = useHistory()

  const deleteEntry = async () => {
    deleteMutation.mutate(null, {
      onSuccess: () => {
        if (expanded) {
          // go back to user profile if delete
          history.push(`/${author.username}`)
        } else {
          // invalidate the query so that the profile page is reloaded
          queryClient.invalidateQueries(`/user/${user.username}`)
        }

        setShowDeleteModal(false)
      }
    })
  }

  return (
    <>
      <div 
        className={`entry${onClick ? " cursor-pointer" : ""}`}
        onClick={onClick}
      >
        <EntryHeader
          author={author}
          createdAt={createdAt}
          community={community}
        />

        {user?.username === author.username ? (
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
          <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
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

      <Modal
        closeTimeoutMS={250}
        isOpen={showDeleteModal}
        className="modal"
        overlayClassName="overlay"
      >
        Are you sure you want to delete your entry?
        <div className="flex justify-end mt-4">
          <Button 
            className="mr-2"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={deleteEntry}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default Entry
