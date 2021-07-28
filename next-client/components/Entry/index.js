import { useRouter } from "next/router"
import Link from "next/link"
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
      className={classNames("mb-8", { "cursor-pointer": !expanded })}
      onClick={onClick}
    >
      <div className={classNames("flex items-center", expanded ? "mb-10" : "mb-1")}>
        {expanded ? (
        <Link 
          href={`/${author.username}`} 
          onClick={(e) => e.stopPropagation()}
        >
          <a className="mr-3 font-semibold text-sm hover:underline flex items-center">
            {/*
            <div className="mr-2 w-6 h-6 rounded-full overflow-hidden">
              {author.avatar ? (
                <img className="object-cover w-full h-full" alt="Avatar" src={author.avatar} />
              ) : (
                <DefaultProPic />
              )}
            </div>
            */}
            {author.name}
          </a>
        </Link> 
        ) : ""}

        <div className="text-gray-400 text-sm">{dateFormat()}</div>
      </div>

      {/* display post */}
      {entry.type === "post" ? (
        <Post 
          title={entry.title} 
          content={entry.content}
          expanded={expanded} 
        />
      ) : ""}
    </div>
  )
}

export default Entry
