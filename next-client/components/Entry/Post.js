import { useState, useMemo } from "react"
import { useMutation } from "react-query"
import Link from "next/link"
import { Node, createEditor } from "slate"
import { Slate, Editable } from "slate-react"
import withSlab from "../Slab/withSlab"
import Leaf from "../Slab/Leaf"
import Element from "../Slab/Element"
import { useAuth } from "../../contexts/auth"
import { 
  Dropdown, 
  Modal, 
  Button 
} from "../../ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { clientQuery } from "../../lib/axios"
import { queryClient } from "../../lib/query"
import { dateFormat } from "../../lib/dateFormat"
import classNames from "classnames"

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
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "…"
  }

  const generatePreviewText = () => {
    const parsed = JSON.parse(entry.content)
    const firstParagraph = parsed.find((element) => element.type === "paragraph")
    const text = Node.string(firstParagraph)
    
    return shortenText(text, 250)
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
      {expanded ? (
      <>
        <h1 className="mb-2 break-words">{entry.title}</h1>

        <div className={classNames("flex items-center", "mb-4")}>
          <Link 
            href={`/${author.username}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <a className="mr-3 font-bold text-sm hover:underline flex items-center">
              {author.name}
            </a>
          </Link> 

          <div className="text-gray-400 text-sm mr-3">{dateFormat(entry.created_at)}</div>

          {user?.username === author.username ? (
          <>
            <Dropdown>
              <Dropdown.Button
                variant="ghost"
                size="sm"
              >
                <FontAwesomeIcon className="text-gray-400" icon="ellipsis-h" />
              </Dropdown.Button>

              <Dropdown.Menu>
                <Dropdown.Item href={`/publish/entry/${entry.id}`}>
                  <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "edit"]} />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                  <span className="text-red-500">
                    <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "trash-alt"]} />
                    Delete
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
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

        <Slate editor={editor} value={JSON.parse(entry.content)}>
          <Editable 
            className="prose mt-14"
            readOnly 
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </Slate>
      </>
      ) : (
      <>
        <h3 className="mb-1 break-words">{entry.title}</h3>
        <div className="mb-2">{generatePreviewText()}</div>
        <div className="text-gray-400 text-sm">{dateFormat(entry.created_at)}</div>
      </>
      )}
    </>
  )
}

export default Post
