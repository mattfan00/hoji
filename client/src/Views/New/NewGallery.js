import React, { useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import Button from "../../Components/Button"
import CustomInput from "../../Components/CustomInput"
import FadeAnimation from "../../Components/FadeAnimation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NewGallery = () => {
  const [text, setText] = useState("")
  const [photos, setPhotos] = useState([])
  const history = useHistory()
  const inputFile = useRef(null)
  const charLimit = 280

  const handleChange = (value) => {
    setText(value.replace("\n\n", "\n"))
  }

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setPhotos([...photos, e.target.result])
      };
      reader.readAsDataURL(file);
    }
  }

  const submit = () => {
    console.log(text)
    history.push("/matt")
  }

  const cancel = () => {
    history.push("/matt")
  }

  const charLeft = () => {
    return charLimit - text.length
  }

  const showFileBrowser = () => {
    inputFile.current.click()
  }

  return (
    <div>
      <div className="flex mb-2 items-center">
        <div className="mr-4 font-medium">@mattfan00</div>
        <div className="mr-4 text-xs tracking-wide uppercase text-gray-400">Mar 21, 2021</div>
        <div className="label">gallery</div>
      </div>

      <div className="mb-10">
        <CustomInput
          className="mb-4"
          placeholder="caption your gallery here..."
          onChange={handleChange}
          autofocus
          // initial="hey"
          // tagName="h2"
        />

        <div className="grid xs:grid-cols-5 grid-cols-4 gap-2">
          {photos.map((photo) => (
            <div style={{'backgroundImage': `url(${photo})`}} className="image-card animate-fade-enter">
            </div>
          ))}
          <div className="image-card">
            <div
              onClick={showFileBrowser}
              className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer"
            >
              <FontAwesomeIcon icon="plus" size="2x" />
            </div>
            <input ref={inputFile} className="hidden" type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex">
          <Button
            className="mr-2"
            type="primary"
            onClick={submit}
            disabled={text.length == 0 || charLeft() < 0}
          >Submit</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>

        <FadeAnimation show={charLeft() <= 20}>
          <div>
            <span className={`font-semibold${charLeft() < 0 ? " text-red-500" : ""}`}>{charLeft()} </span>
            characters left</div>
        </FadeAnimation>
      </div>
    </div>
  )
}

export default NewGallery