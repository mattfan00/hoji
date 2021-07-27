import { useMemo } from "react"
import { createEditor } from "slate"
import { Slate, Editable } from "slate-react"
import withSlab from "../Slab/withSlab"
import Leaf from "../Slab/Leaf"
import Element from "../Slab/Element"
import classNames from "classnames"

const TitleWrapper = ({ children, expanded }) => {
  return (
    expanded ? (
    <h1 className="mb-20 break-words">{children}</h1>
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

  return (
    <>
      {title ? (
      <TitleWrapper expanded={expanded}>{title}</TitleWrapper>
      ) : ""}

      <div className={classNames("relative", { "collapsed": !expanded })}>
        <Slate editor={editor} value={JSON.parse(content)}>
          <Editable 
            className="prose"
            readOnly 
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </Slate>
      </div>
    </>
  )
}

export default Post
