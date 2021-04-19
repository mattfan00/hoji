import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import Entry from "../Components/Entry"

const EntryView = () => {
  const { id } = useParams()

  const { data: entry } = useQuery(`/entry/${id}`)

  return (
    <Entry
      id={entry?.id}
      username={entry?.user?.username}
      type={entry?.type}
      createdAt={entry?.created_at}
      title={entry?.title}
      description={entry?.description}
      content={entry?.content}
      expanded={true}
    />
  )
}

export default EntryView
