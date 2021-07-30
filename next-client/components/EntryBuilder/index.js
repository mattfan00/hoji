import { useState, useRef } from "react"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "react-query"
import { emptyBlock, trimEnd, hasText } from "../Slab/Utils" 
import { Button } from "../../ui"
import NextLink from "../../components/NextLink"
import { useAuth } from "../../contexts/auth"
import { clientQuery } from "../../lib/axios"

import Post from "./Post"

const EntryBuilder = ({ editing }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(() => emptyBlock())
  const initialTitle = useRef(null)
  const { user } = useAuth()
  const router = useRouter()
  const { id } = router.query

  const submitMutation = useMutation(newEntry => clientQuery().post("/entry", newEntry), {
    onSuccess: () => {
      router.push(`/${user.username}`)
    }
  })

  const updateMutation = useMutation(updatedEntry => clientQuery().put(`/entry/${id}`, updatedEntry), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/user/${user.username}`)
      router.push(`/${user.username}`)
    }
  })

  const handleTitleChange = (value) => setTitle(value)

  const submit = async () => {
    const body = {
      type: "post",
      title,
      content: JSON.stringify(trimEnd(content))
    }

    // if editing, then update
    // else, submit a new entry
    if (editing) {
      updateMutation.mutate(body)
    } else {
      submitMutation.mutate(body)
    }
  }

  const { data: entry, isLoading } = useQuery(`/entry/${id}`, {
    enabled: editing ? true : false,
    onSuccess: (data) => {
      // check if user is allowed to edit the entry
      if (user.id != data.user_id) {
        router.push(`/entry/${id}`)
      }

      setTitle(data.title || "")
      initialTitle.current = data.title || ""
      setContent(JSON.parse(data.content))
    }
  }) 

  if (editing && isLoading) {
    return <></>
  }

  return (
    <> 
      <div className="pt-12 pb-32">
        <Post
          content={content}
          setContent={setContent}
          onTitleChange={handleTitleChange} 
          initialTitle={initialTitle.current}
        />
      </div>

      <div className="fixed bottom-0 left-0 z-20 bg-white w-full px-8">
        <div className="flex items-center justify-between py-8 max-w-2xl mx-auto">
          <NextLink href={`/${user.username}`}>Cancel</NextLink>
          <Button
            //variant="primary"
            //className="w-full"
            //disabled={submitDisabled()}
            onClick={() => submit()}
          >{editing ? "Update" : "Submit"}</Button>
        </div>
      </div>
    </> 
  )
}

export default EntryBuilder
