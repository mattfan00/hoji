import { useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import Link from "next/link"
import Post from "./Post"
import classNames from "classnames"
import dayjs from "dayjs"
import { useAuth } from "../../contexts/auth"
import { Dropdown, Modal, Button } from "../../ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { clientQuery } from "../../lib/axios"
import { queryClient } from "../../lib/query"

const Entry = ({
  entry,
  author,
  expanded,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const deleteMutation = useMutation(() => clientQuery().delete(`/entry/${entry.id}`))

  const onClick = () => {
    if (!expanded) {
      router.push(`/entry/${entry.id}`)
    }
  }

  const deleteEntry = async () => {
    deleteMutation.mutate(null, {
      onSuccess: () => {
        if (expanded) {
          // go back to user profile if delete
          router.push(`/${author.username}`)
        } else {
          // invalidate the query so that the profile page is reloaded
          queryClient.invalidateQueries(`/user/${user.username}`)
        }

        setShowDeleteModal(false)
      }
    })
  }

  const dateFormat = () => {
    if (dayjs().isSame(entry.created_at, "day")) {
      return dayjs(entry.created_at).format("h:mm a") 
    } else {
      return dayjs(entry.created_at).format("MMM D, YYYY")
    }
  }

  return (
    <div 
      className={classNames("relative mb-8", { "cursor-pointer": !expanded })}
      onClick={onClick}
    >
      <div className={classNames("flex items-center", expanded ? "mb-4" : "mb-1")}>
        {expanded ? (
        <Link 
          href={`/${author.username}`} 
          onClick={(e) => e.stopPropagation()}
        >
          <a className="mr-3 font-semibold text-sm hover:underline flex items-center">
            {/*
            <div className="mr-2 w-6 h-6 rounded-full overflow-hidden">
              {author.avatar ? (
                <img className="object-cover w-full h-full" alt="Avatar" src={author.avatar} />
              ) : (
                <DefaultProPic />
              )}
            </div>
            */}
            {author.name}
          </a>
        </Link> 
        ) : ""}

        <div className="text-gray-400 text-sm">{dateFormat()}</div>
      </div>

      {user?.username === author.username ? (
      <Dropdown 
        className="absolute -top-1 right-0"
      >
        <Dropdown.Button
          variant="ghost"
          size="sm"
        >
          <FontAwesomeIcon className="text-gray-400" icon="ellipsis-h" />
        </Dropdown.Button>

        <Dropdown.Items direction="left">
          <Dropdown.Item href={`/entry/${entry.id}/edit`}>
            <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "edit"]} />
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
            <span className="text-red-500">
              <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "trash-alt"]} />
              Delete
            </span>
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown>
      ) : ""}

      {/* display post */}
      {entry.type === "post" ? (
        <Post 
          title={entry.title} 
          content={entry.content}
          expanded={expanded} 
        />
      ) : ""}

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
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
    </div>
  )
}

export default Entry
