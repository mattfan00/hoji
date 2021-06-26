import React, { useState, useContext, useRef } from "react"
import { useQuery, useMutation } from "react-query"
import { queryClient } from "../Utils/queryClient"
import DefaultProPic from "../Icons/DefaultProPic"
import Button from "../Components/Button"
import Input from "../Components/Input"
import Form from "../Components/Form"
import Error from "../Components/Error"
import TextArea from "../Components/TextArea"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"


const Settings = () => {
  const updateMutation = useMutation(fields => axios.put(`/user/${user.username}`, fields), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/auth/me`)
      setEdited(false)
    },
  })

  const uploadMutation = useMutation(formData => axios.put(`/user/${user.username}/avatar`, formData), {
    onSuccess: ({ data }) => setFields({...fields, avatar: data})
  })

  const removeMutation = useMutation(() => axios.delete(`/user/${user.username}/avatar`), {
    onSuccess: () => setFields({...fields, avatar: ""})
  })

  const [fields, setFields] = useState({
    avatar: "",
    name: "",
    username: "",
    description: "",
    website: "",
  })
  const [edited, setEdited] = useState(false)
  const { user, setUser } = useContext(AuthContext)
  const inputFile = useRef(null)

  useQuery([`/user/${user?.username}`, { page: "settings" }], {
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(queryKey[0])
      return data
    },
    enabled: user ? true : false,
    onSuccess: (data) => {
      setFields({
        avatar: data.avatar || "",
        name: data.name || "",
        username: data.username || "",
        description: data.description || "",
        website: data.website || "",
      })
    }
  })

  const handleChange = (e, field) => {
    setEdited(true)
    setFields({...fields, [field]: e.target.value})
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    updateMutation.mutate(fields)
  }

  const showFileBrowser = () => inputFile.current.click()

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    const formData = new FormData()
    formData.append("file", file)

    uploadMutation.mutate(formData)
  }

  const removeImage = async () => {
    removeMutation.mutate()
  }

  return (
    <div className="m-auto">
      <h2 className="mb-6">General</h2>
      <div className="mb-10">
        <div className="flex items-center mb-6">
          <div className="mr-5 w-12 h-12 rounded-full overflow-hidden">
            {fields.avatar ? (
              <img className="object-cover w-full h-full" alt="Avatar" src={fields.avatar} />
            ) : (
              <DefaultProPic />
            )}
          </div>
          <Button 
            variant="primary" 
            className="mr-2" 
            onClick={showFileBrowser}
            disabled={uploadMutation.isLoading || removeMutation.isLoading}
          >Upload</Button>
          <Button 
            onClick={removeImage}
            disabled={uploadMutation.isLoading || removeMutation.isLoading}
          >Remove</Button>
          <input ref={inputFile} className="hidden" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <Error className="mb-4" error={updateMutation.error} />

        <Form onSubmit={updateProfile}>
          <Input 
            className="mb-4" label="Name" name="name" autoCompleteOff required
            minLength="2"
            maxLength="50"
            value={fields.name}
            onChange={(e) => handleChange(e, "name")}
          />

          <Input 
            className="mb-4" label="Username" name="username" autoCompleteOff required
            minLength="2"
            maxLength="20"
            value={fields.username}
            onChange={(e) => handleChange(e, "username")}
          />

          <TextArea 
            className="mb-4 max-h-28" label="Description" name="description" 
            maxLength="280"
            value={fields.description}
            onChange={(e) => handleChange(e, "description")}
          />

          <Input 
            className="mb-4" label="Website" name="website" autoCompleteOff 
            maxLength="280"
            value={fields.website}
            onChange={(e) => handleChange(e, "website")}
          />

          <Button 
            type="submit"
            variant="primary"
            disabled={updateMutation.isLoading || !edited}
          >Update profile</Button>
        </Form>
      </div>
    </div>
  )
}

export default Settings
