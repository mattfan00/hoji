import { 
  Editor, 
  Transforms,
  Element,
} from 'slate'
import isUrl from "is-url"
import imageExtensions from "image-extensions"

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const emptyBlock = () => {
  return  [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    }
  ]
}

const isInlineActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleInline = (editor, format) => {
  const isActive = isInlineActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  })

  return !!match
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && Element.isElement(n) && n.type
      ),
    split: true,
  })
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
  Transforms.insertNodes(editor, emptyBlock())
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

export {
  emptyBlock,
  isInlineActive,
  toggleInline, 
  isBlockActive,
  toggleBlock,
  insertImage,
  isImageUrl,
}

