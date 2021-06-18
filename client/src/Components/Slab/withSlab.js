import { withReact } from "slate-react"
import { withHistory } from "slate-history"
import { insertImage, isImageUrl, wrapLink } from "./Utils"
import isUrl from "is-url"

const withSlab = (editor) => {
  const customEditor = withHistory(withReact(editor))
  const { insertText, insertData, isVoid, isInline } = customEditor

  customEditor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  customEditor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  customEditor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(customEditor, text)
    } else {
      insertText(text)
    }
  }


  customEditor.insertData = (data) => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(customEditor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(customEditor, text)
    } else if (text && isUrl(text)) {
      wrapLink(customEditor, text)
    } else {
      insertData(data)
    }
  }

  return customEditor 
}

export default withSlab
