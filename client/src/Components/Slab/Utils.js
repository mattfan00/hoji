import { Editor, Transforms } from 'slate'

const toggleBlock = (editor, format) => {
  Transforms.setNodes(
    editor,
    { type: format },
    { match: n => Editor.isBlock(editor, n) }
  )
}

export {
  toggleBlock
}

