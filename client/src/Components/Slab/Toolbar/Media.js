import React, { useRef } from "react"
import { useMutation } from "react-query"
import { useSlate } from "slate-react"
import Button from "../../Button"
import { insertImage } from "../Utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"

const Media = () => {
  const uploadMutation = useMutation(formData => axios.post(`/entry/image`, formData), {
    onSuccess: ({ data }) => {
      insertImage(editor, data)
    } 
  })

  const inputFile = useRef(null)
  const editor = useSlate()

  const showFileBrowser = () => inputFile.current.click()

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    const formData = new FormData()
    formData.append("file", file)

    uploadMutation.mutate(formData)
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
