import { useMemo } from "react"
import { Node, createEditor } from "slate"
import { Slate, Editable } from "slate-react"
import withSlab from "../Slab/withSlab"
import Leaf from "../Slab/Leaf"
import Element from "../Slab/Element"
import classNames from "classnames"

const TitleWrapper = ({ children, expanded }) => {
  return (
    expanded ? (
    <h1 className="mb-10 break-words">{children}</h1>
    ) : (
    <div className="mb-1 break-words font-semibold">{children}</div>
    )
  )
}

const Post = ({ 
  title,
  content,
  expanded,
}) => {
  const editor = useMemo(() => withSlab(createEditor()), [])

  const renderLeaf = (props) => <Leaf {...props} />
  const renderElement = (props) => <Element {...props} />

  const shortenText = (str, maxLen, separator = " ") => {
    if (str.length <= maxLen) return str
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "..."
  }

  const generatePreviewText = () => {
    const parsed = JSON.parse(content)
    const firstParagraph = parsed.find((element) => element.type === "paragraph")
    const text = Node.string(firstParagraph)
    
    return shortenText(text, 370)
  }


  return (
    <>
      {title ? (
      <TitleWrapper expanded={expanded}>{title}</TitleWrapper>
      ) : ""}

      <div className={classNames("relative")}>
        {expanded ? (
        <Slate editor={editor} value={JSON.parse(content)}>
          <Editable 
            className="prose"
            readOnly 
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </Slate>
        ) : (
        generatePreviewText()
        )}
      </div>
    </>
  )
}

export default Post
