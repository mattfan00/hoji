import { withReact } from "slate-react"
import { withHistory } from "slate-history"
import { insertImage, isImageUrl } from "./Utils"

const withSlab = editor => {
  const customEditor = withHistory(withReact(editor))
  const { insertData, isVoid } = customEditor

  customEditor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  customEditor.insertData = data => {
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
    } else {
      insertData(data)
    }
  }

  return customEditor 
}

export default withSlab
