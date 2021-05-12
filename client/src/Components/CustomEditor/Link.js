import React, { useState } from "react"
import { EditorState } from 'draft-js';
import Button from "../Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Link = ({
  editorState,
  onLinkToggle
}) => {
  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState("")

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

      confirmLink()
    }
  }

  const confirmLink = () => {
    let linkUrl = window.prompt("Add link http:// ")
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: linkUrl}
    );
    console.log(contentStateWithEntity)
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

    onLinkToggle(newEditorState, entityKey)
  }

  return (
    <Button
      variant="text"
      size="sm"
      className={`mr-1`}
      onMouseDown={(e) => {
        e.preventDefault()
        previewLink()
      }}
    >Link</Button>
  )
}

export default Link
