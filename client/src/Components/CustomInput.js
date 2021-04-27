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
      textInput.current.innerHTML = initial
    }
  }, [initial]) 

  const emitChange = () => {
    onChange(textInput.current.innerText)
  }

  const removeFormatting = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertHTML", false, text);
    emitChange()
  }

  return (
    <div className={className}>
      <CustomTag
        className="custom-input focus:outline-none cursor-text"
        placeholder={placeholder}
        contentEditable="true"
        ref={textInput}
        //dangerouslySetInnerHTML={{__html: defaultValue.current}}
        onInput={emitChange}
        onPaste={removeFormatting}
      ></CustomTag>
      {/* {textInput.current &&
      textInput.current.innerText.replace("\n\n", "\n").length} */}
    </div>
  )
}

export default CustomInput
