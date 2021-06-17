import React from "react"
import { useSelected, useFocused } from "slate-react"

const Image = ({ 
  attributes, 
  children, 
  element,
}) => {
  const selected = useSelected()
  const focused = useFocused()

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img 
          className="m-auto mb-4 w-4/5" 
          style={{
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none'
          }}
          src={element.url} 
          draggable={false} 
        />
      </div>
      {children}
    </div>
  )
}

const Element = ({
  attributes, 
  children, 
  element, 
}) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes} className="list-disc px-10">{children}</ul>
    case 'numbered-list':
      return <ol {...attributes} className="list-decimal px-10">{children}</ol>
    case 'heading':
      return <h3 {...attributes}>{children}</h3>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'image':
      return <Image
        attributes={attributes}
        children={children}
        element={element}
      />
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default Element
