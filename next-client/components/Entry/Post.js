import { useState, useMemo } from "react"
import { useMutation } from "react-query"
import Link from "next/link"
import { Node, createEditor } from "slate"
import { Slate, Editable } from "slate-react"
import withSlab from "../Slab/withSlab"
import Leaf from "../Slab/Leaf"
import Element from "../Slab/Element"
import { useAuth } from "../../contexts/auth"
import { Dropdown, Modal, Button } from "../../ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { clientQuery } from "../../lib/axios"
import { queryClient } from "../../lib/query"
import classNames from "classnames"
import dayjs from "dayjs"

const TitleWrapper = ({ children, expanded }) => {
  return (
    expanded ? (
    <h1 className="mb-2 break-words">{children}</h1>
    ) : (
    <div className="mb-1 break-words font-semibold">{children}</div>
    )
  )
}

const Post = ({ 
  entry,
  author,
  expanded,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { user } = useAuth()
  const editor = useMemo(() => withSlab(createEditor()), [])

  const deleteMutation = useMutation(() => clientQuery().delete(`/entry/${entry.id}`))

  const renderLeaf = (props) => <Leaf {...props} />
  const renderElement = (props) => <Element {...props} />

  const shortenText = (str, maxLen, separator = " ") => {
    if (str.length <= maxLen) return str
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "..."
  }

  const generatePreviewText = () => {
    const parsed = JSON.parse(content)
    const firstParagraph = parsed.find((element) => element.type === "paragraph")
    const text = Node.string(firstParagraph)
    
    return shortenText(text, 370)
  }

  const dateFormat = () => {
    if (dayjs().isSame(entry.created_at, "day")) {
      return dayjs(entry.created_at).format("h:mm a") 
    } else {
      return dayjs(entry.created_at).format("MMM D, YYYY")
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

  return (
    <>
      {entry.title ? (
      <TitleWrapper expanded={expanded}>{entry.title}</TitleWrapper>
      ) : ""}

      <div className={classNames("flex items-center", "mb-4")}>
        <Link 
          href={`/${author.username}`} 
          onClick={(e) => e.stopPropagation()}
        >
          <a className="mr-3 font-semibold text-sm hover:underline flex items-center">
            {author.name}
          </a>
        </Link> 

        <div className="text-gray-400 text-sm mr-3">{dateFormat()}</div>

        {user?.username === author.username ? (
        <>
          <Dropdown>
            <Dropdown.Button
              variant="ghost"
              size="sm"
            >
              <FontAwesomeIcon className="text-gray-400" icon="ellipsis-h" />
            </Dropdown.Button>

            <Dropdown.Items>
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
        </>
        ) : ""}
      </div>

      <div className="relative mt-14">
        {expanded ? (
        <Slate editor={editor} value={JSON.parse(entry.content)}>
          <Editable 
            className="prose"
            readOnly 
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </Slate>
        ) : (
        generatePreviewText()
        )}
      </div>
    </>
  )
}

export default Post
