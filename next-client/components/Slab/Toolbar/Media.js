import React, { useRef } from "react"
import { useMutation } from "react-query"
import { useSlate } from "slate-react"
import { Button } from "../../../ui"
import { insertImage, isBlockActive } from "../Utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BiImage } from "react-icons/bi"
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
        className="mr-1"
        onClick={showFileBrowser}
        disabled={isBlockActive(editor, "image")}
      ><BiImage size="1.5em" /></Button>
      <input ref={inputFile} className="hidden" type="file" accept="image/*" onChange={handleImageUpload} />
    </>
  )
}

export default Media
