import React, { useState } from "react"
import { ReactEditor, useSlate } from "slate-react"
import { Transforms } from "slate"
import Button from "../../Button"
import Input from "../../Input"
import { isBlockActive, unwrapLink, insertLink } from "../Utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "react-modal"
import isUrl from "is-url"

const Link = ({
}) => {
  const editor = useSlate()
  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState("")
  const [currSelection, setCurrSelection] = useState({})

  const cancelPreview = () => {
    // necessary for refocusing the editor
    Transforms.select(editor, currSelection)
    ReactEditor.focus(editor)

    hideModal()
  }

  const previewLink = () => {
    setShowURLInput(true)
    setCurrSelection(editor.selection)
  }

  const confirmLink = () => {
    insertLink(editor, urlValue, currSelection)
    ReactEditor.focus(editor)

    hideModal()
  }

  const hideModal = () => {
    setShowURLInput(false)
    setUrlValue("")
    setCurrSelection({})
  }

  return (
    <>
      <Button
        variant="text"
        size="sm"
        className="mr-1"
        active={isBlockActive(editor, "link")}
        onMouseDown={(e) => {
          e.preventDefault()

          if (isBlockActive(editor, "link")) {
            unwrapLink(editor)
          } else {
            previewLink()
          }
        }}
        disabled={!editor.selection || isBlockActive(editor, "image")}
      ><FontAwesomeIcon icon="link" /></Button>

      <Modal
        closeTimeoutMS={250}
        isOpen={showURLInput}
        className="modal link"
        overlayClassName="overlay"
      >
        <Input 
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
          autoFocus 
        />
        <div className="flex justify-end mt-2">
          <Button 
            className="mr-2" 
            onMouseDown={cancelPreview}
          >Cancel</Button>
          <Button 
            variant="primary" 
            onClick={confirmLink}
            disabled={!isUrl(urlValue)}
          >Submit</Button>
        </div>
      </Modal>

    </>
  )
}

export default Link
