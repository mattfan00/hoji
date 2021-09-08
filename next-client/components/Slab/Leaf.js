import React from "react"

const Leaf = ({ 
  attributes, 
  children, 
  leaf,
}) => {
  const classes = []

  if (leaf.bold) {
    classes.push("font-bold")
  }

  if (leaf.italic) {
    classes.push("italic")
  }

  if (leaf.underline) {
    classes.push("underline")
  }

  if (leaf.code) {
    classes.push("code")
  }

  return <span {...attributes} className={classes.join(" ")}>{children}</span>
}

export default Leaf
