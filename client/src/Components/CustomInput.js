import React, { useEffect, useRef } from "react"

const CustomInput = ({
  className,
  placeholder,
  onChange,
  initial,
  tagName,
  autofocus,
  charLimit,
}) => {
  const textInput = useRef(null)
  //const defaultValue = useRef(initial)
  const CustomTag = tagName ? tagName : "div"

  useEffect(() => {
    if (autofocus) {
      textInput.current.focus()
    }
  }, [autofocus])

  useEffect(() => {
    if (initial) {
      textInput.current.innerHTML = initial
    }
  }, [initial]) 

  const handleChange = (e) => {
    const charLength = textInput.current.innerText.trim().length
    if (charLength === 0) {
      textInput.current.innerText = ""
    }

    if (charLimit && charLength > charLimit && e.keyCode != 8) {
      textInput.current.innerText = textInput.current.innerText.slice(0, charLimit)
      placeCaretAtEnd(textInput.current)
      return
    }

    onChange(textInput.current.innerText)
  }

  function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
      && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  const removeFormatting = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertHTML", false, text);
    handleChange(e)
  }

  return (
    <div className={className}>
      <CustomTag
        className="custom-input focus:outline-none cursor-text break-words"
        placeholder={placeholder}
        contentEditable="true"
        ref={textInput}
        //dangerouslySetInnerHTML={{__html: defaultValue.current}}
        onInput={handleChange}
        onPaste={removeFormatting}
      ></CustomTag>
    </div>
  )
}

export default CustomInput
