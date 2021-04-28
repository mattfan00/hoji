import React, { useEffect, useRef } from "react"

const CustomInput = ({
  className,
  placeholder,
  onChange,
  initial,
  tagName,
  autofocus,
}) => {
  const textInput = useRef(null)
  //const defaultValue = useRef(initial)
  const CustomTag = tagName ? tagName : "div"

  useEffect(() => {
    if (autofocus) {
      textInput.current.focus()
    }
  }, [])

  useEffect(() => {
    if (initial) {
      console.log(initial)
      console.log("setting initial")
      textInput.current.innerHTML = initial
    }
  }, [initial]) 

  const handleChange = () => {
    if (textInput.current.innerText.trim().length == 0) {
      textInput.current.innerText = ""
    }
    onChange(textInput.current.innerText)
  }

  const removeFormatting = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertHTML", false, text);
    handleChange()
  }

  return (
    <div className={className}>
      <CustomTag
        className="custom-input focus:outline-none cursor-text"
        placeholder={placeholder}
        contentEditable="true"
        ref={textInput}
        //dangerouslySetInnerHTML={{__html: defaultValue.current}}
        onInput={handleChange}
        onPaste={removeFormatting}
      ></CustomTag>
      {/* {textInput.current &&
      textInput.current.innerText.replace("\n\n", "\n").length} */}
    </div>
  )
}

export default CustomInput
