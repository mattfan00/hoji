import React, { useState } from "react"
import { EditorState } from 'draft-js';
import Button from "../Button"
import Input from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "react-modal"

const Link = ({
  editor,
  editorState,
  onLinkToggle
}) => {
  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState("")

  const cancelPreview = () => {
    setShowURLInput(false)
    setTimeout(() => editor.current.focus(), 0)
  }

  const previewLink = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setShowURLInput(true)
      setUrlValue(url)
      //confirmLink()
    }
  }

  const confirmLink = () => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

    onLinkToggle(newEditorState, entityKey)

    setShowURLInput(false)
    setUrlValue("")
  }

  const checkValidLink = () => {
    try {
      new URL(urlValue)
      return true
    } catch (_) {
      return false
    }
  }

  return (
    <>
      <Button
        variant="text"
        size="sm"
        className={`mr-1`}
        onMouseDown={(e) => {
          e.preventDefault()
          previewLink()
        }}
        disabled={editorState.getSelection().isCollapsed()}
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
            disabled={!checkValidLink()}
          >Submit</Button>
        </div>
      </Modal>

    </>
  )
}

export default Link
