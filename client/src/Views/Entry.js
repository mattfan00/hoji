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
      setEntry(entryResult.data)
    }

    getEntry()
  }, [])

  return (
    <Entry
      {...entry}
      expanded={true}
    />
  )
}

export default EntryView
