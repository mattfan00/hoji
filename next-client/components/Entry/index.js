import { useState } from "react"
import { useRouter } from "next/router"
import Post from "./Post"
import classNames from "classnames"
import dayjs from "dayjs"

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

  const dateFormat = () => {
    if (dayjs().isSame(entry.created_at, "day")) {
      return dayjs(entry.created_at).format("h:mm a") 
    } else {
      return dayjs(entry.created_at).format("MMM D, YYYY")
    }
  }

  return (
    <div 
      className={classNames("mb-2", { "cursor-pointer": !expanded })}
      onClick={onClick}
    >
      {expanded ? (
      <>
        {entry.type === "post" ? (
        <Post 
          entry={entry}
          author={author}
          expanded={expanded} 
        />
        ) : ""}
      </>
      ) : (
      <div className="flex justify-between">
        <div>{entry.title}</div>
        <div className="text-gray-400">{dateFormat()}</div>
      </div>
      )}
    </div>
  )
}

export default Entry
