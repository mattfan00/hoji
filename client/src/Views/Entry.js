import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Entry from "../Components/Entry"
import axios from "axios"

const EntryView = () => {
  const [entry, setEntry] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const getEntry = async () => {
      const entryResult = await axios.get(`/entry/${id}`)
      console.log(entryResult.data)
      setEntry(entryResult.data)
    }

    getEntry()
  }, [])

  return (
    <Entry
      id={entry?.id}
      user={entry?.user?.username}
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
