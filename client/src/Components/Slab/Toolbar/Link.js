import React, { useState } from "react"
import { useSlate } from "slate-react"
import Button from "../../Button"
import Input from "../../Input"
import { insertLink } from "../Utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "react-modal"
import isUrl from "is-url"

const Link = ({
}) => {
  const editor = useSlate()
  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState("")

  const cancelPreview = () => {
    setShowURLInput(false)
    //setTimeout(() => editor.current.focus(), 0)
  }

  const previewLink = () => {
    console.log(editor.selection)
    setShowURLInput(true)
    //setUrlValue(url)
    /*
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
    */
  }

  const confirmLink = () => {
    insertLink(editor, urlValue)
    setShowURLInput(false)
    setUrlValue("")
    /*
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
    */
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
        disabled={!editor.selection}
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
