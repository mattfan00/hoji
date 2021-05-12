import React, { useRef } from "react"
import { EditorState } from "draft-js"
import { useMutation } from "react-query"
import Button from "../Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"

const Media = ({
  editorState,
  onMediaUpload
}) => {
  const uploadMutation = useMutation(formData => axios.post(`/entry/image`, formData), {
    onSuccess: ({ data }) => {
      confirmMedia(data)
    } 
  })

  const inputFile = useRef(null)

  const showFileBrowser = () => inputFile.current.click()

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    console.log(file)
    const formData = new FormData()
    formData.append("file", file)

    uploadMutation.mutate(formData)
  }

  const confirmMedia = (link) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "MEDIA",
      "IMMUTABLE",
      { src: link }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    )

    onMediaUpload(newEditorState, entityKey)
  }

  return (
    <>
      <Button
        variant="text"
        size="sm"
        className={`mr-1`}
        onClick={showFileBrowser}
      ><FontAwesomeIcon icon="image" /></Button>
      <input ref={inputFile} className="hidden" type="file" accept="image/*" onChange={handleImageUpload} />
    </>
  )
}

export default Media
