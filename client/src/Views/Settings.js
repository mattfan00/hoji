import React, { useState, useContext, useEffect, useRef } from "react"
import DefaultProPic from "../Icons/DefaultProPic"
import Button from "../Components/Button"
import Input from "../Components/Input"
import Form from "../Components/Form"
import Error from "../Components/Error"
import TextArea from "../Components/TextArea"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"


const Settings = () => {
  const [fields, setFields] = useState({
    avatar: "",
    name: "",
    username: "",
    description: "",
    website: "",
  })
  const [edited, setEdited] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext(AuthContext)
  const inputFile = useRef(null)

  useEffect(() => {
    const getUser = async () => {
      const resultUser = await axios.get(`/user/${user.username}`)
      const { data } = resultUser

      setFields({
        avatar: data.avatar || "",
        name: data.name || "",
        username: data.username || "",
        description: data.description || "",
        website: data.website || "",
      })
    }

    if (user) {
      getUser()
    }
  }, [user])

  const handleChange = (e, field) => {
    setEdited(true)
    setFields({...fields, [field]: e.target.value})
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      const resultUpdate = await axios.put(`/user/${user.username}`, fields)

      setError(null)
      setUser(resultUpdate.data)
    } catch({ response }) {
      setError(response.data.message)
    }
    setEdited(false)
  }

  const showFileBrowser = () => inputFile.current.click()

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    const formData = new FormData()
    formData.append("file", file)

    const uploadResult = await axios.put(`/user/${user.username}/avatar`, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    })

    setFields({...fields, avatar: uploadResult.data})
  }

  return (
    <div className="max-w-md m-auto">
      <h2 className="mb-6">General</h2>
      <div className="mb-10">
        <div className="flex items-center mb-6">
          <div className="mr-5 w-12 h-12 rounded-full overflow-hidden">
            {fields.avatar ? (
              <img className="object-cover w-full h-full" src={fields.avatar} />
            ) : (
              <DefaultProPic />
            )}
          </div>
          <Button className="mr-2" onClick={showFileBrowser}>Upload</Button>
          <Button>Remove</Button>
          <input ref={inputFile} className="hidden" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <Error className="mb-4" show={error}>{error}</Error>

        <Form onSubmit={updateProfile}>
          <Input 
            className="mb-4" label="Name" name="name" autocompleteOff required
            value={fields.name}
            onChange={(e) => handleChange(e, "name")}
          />

          <Input 
            className="mb-4" label="Username" name="username" autocompleteOff required
            value={fields.username}
            onChange={(e) => handleChange(e, "username")}
          />
          <TextArea 
            className="mb-4 max-h-28" label="Description" name="description" 
            value={fields.description}
            onChange={(e) => handleChange(e, "description")}
          />
          <Input 
            className="mb-4" label="Website" name="website" autocompleteOff 
            value={fields.website}
            onChange={(e) => handleChange(e, "website")}
          />

          <Button 
            type="submit"
            variant="primary"
            disabled={!edited}
          >Update profile</Button>
        </Form>
      </div>

    </div>
  )
}

export default Settings
