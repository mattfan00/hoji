import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import Entry from "../Components/Entry/Entry"
import NotFound from "../Components/NotFound"

const EntryView = () => {
  const { id } = useParams()

  const { data: entry, isLoading } = useQuery(`/entry/${id}`)

  if (!isLoading && !entry) {
    return <NotFound />
  }

  return (
    <Entry
      id={entry?.id}
      username={entry?.user?.username}
      type={entry?.type}
      createdAt={entry?.created_at}
      title={entry?.title}
      content={entry?.content}
      expanded={true}
    />
  )
}

export default EntryView
