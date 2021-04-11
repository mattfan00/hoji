import React, { useState, useContext, useEffect } from "react"
import DefaultProPic from "../Icons/DefaultProPic"
import Button from "../Components/Button"
import Input from "../Components/Input"
import Form from "../Components/Form"
import TextArea from "../Components/TextArea"
import { AuthContext } from "../Context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"


const Settings = () => {
  const [fields, setFields] = useState({
    name: "",
    username: "",
    description: "",
    website: "",
  })
  const [edited, setEdited] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const getUser = async () => {
      const resultUser = await axios.get(`/user/${user.username}`)
      const { data } = resultUser

      setFields({
        name: data.name,
        username: data.username,
        description: data.details.description,
        website: data.website,
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

  const updateProfile = (e) => {
    e.preventDefault()
    setEdited(false)
  }

  return (
    <div className="max-w-md m-auto">
      <h2 className="mb-6">General</h2>
      <div className="mb-10">
        <div className="flex items-center mb-6">
          <div className="mr-5 w-12 h-12 rounded-full overflow-hidden">
            <DefaultProPic />
          </div>
          <Button className="mr-2">Upload</Button>
          <Button>Remove</Button>
        </div>

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
