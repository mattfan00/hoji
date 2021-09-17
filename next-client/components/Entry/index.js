import { useState } from "react"
import { useRouter } from "next/router"
import Post from "./Post"
import classNames from "classnames"

const Entry = ({
  entry,
  author,
  expanded,
}) => {
  const router = useRouter()

  const onClick = () => {
    if (!expanded) {
      router.push(`/entry/${entry.id}`)
    }
  }

  return (
    <div 
      className={classNames("mb-8", { "cursor-pointer": !expanded })}
      onClick={onClick}
    >
      {entry.type === "post" ? (
      <Post 
        entry={entry}
        author={author}
        expanded={expanded} 
      />
      ) : ""}
    </div>
  )
}

export default Entry
