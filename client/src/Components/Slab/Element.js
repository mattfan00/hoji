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
          className="m-auto w-4/5" 
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
    case 'link':
      return (
        <a 
          {...attributes} 
          href={element.url} 
          className="color"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </a>
      )
    case 'heading':
      return <h3 {...attributes} className="mt-8">{children}</h3>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'list-item':
      return <li {...attributes} className="mb-2">{children}</li>
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'code-block':
      return <code {...attributes}>{children}</code>
    case 'image':
      return (
        <Image
          attributes={attributes}
          children={children}
          element={element}
        />
      )
    default:
      return <p {...attributes} className="prose">{children}</p>
  }
}

export default Element
