import React, { useState, useContext, useRef } from "react"
import { useMutation } from "react-query"
import { queryClient } from "../Utils/queryClient"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import DefaultProPic from "../Icons/DefaultProPic"
import Button from "../Components/Button"
import Input from "../Components/Input"
import Error from "../Components/Error"
import TextArea from "../Components/TextArea"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"


const Settings = () => {
  const updateMutation = useMutation(fields => axios.put(`/user/${user.username}`, fields), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/auth/me`)
    },
  })

  const uploadMutation = useMutation(formData => axios.put(`/user/${user.username}/avatar`, formData), {
    onSuccess: ({ data }) => setAvatar(data)
  })

  const removeMutation = useMutation(() => axios.delete(`/user/${user.username}/avatar`), {
    onSuccess: () => setAvatar("")
  })

  const { user, setUser } = useContext(AuthContext)
  const [avatar, setAvatar] = useState(user.avatar || "")
  const inputFile = useRef(null)

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
            {avatar ? (
              <img className="object-cover w-full h-full" alt="Avatar" src={avatar} />
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

        <Formik
          initialValues={{ 
            name: user.name || "",
            username: user.username || "",
            description: user.description || "",
            website: user.website || "",
          }}
          validationSchema={Yup.object({
           name: Yup.string()
            .min(1, "Must be at least ${min} characters")
            .max(50, "Must be at most ${max} characters")
            .required('Required'),
           username: Yup.string()
            .min(4, "Must be at least ${min} characters")
            .max(20, "Must be at most ${max} characters")
            .matches("^[a-zA-Z_]*$", "Must contain letters, numbers, or '_'")
            .required('Required'),
           description: Yup.string()
            .max(280, "Must be at most ${max} characters"),
           website: Yup.string()
            .max(280, "Must be at most ${max} characters")
            .url()
          })}
          onSubmit={(values) => {
            updateMutation.mutate(values)
          }}
        >
          <Form>
            <div className="mb-5">
              <Input 
                className="mb-4" label="Name" name="name" autoCompleteOff
                minLength="1"
                maxLength="50"
              />

              <Input 
                className="mb-4" label="Username" name="username" autoCompleteOff
                minLength="4"
                maxLength="20"
              />

              <TextArea 
                className="mb-4 max-h-28" label="Description" name="description" 
                maxLength="280"
              />

              <Input 
                className="mb-4" label="Website" name="website" autoCompleteOff 
                maxLength="280"
              />
            </div>

            <Button 
              type="submit"
              variant="primary"
              disabled={updateMutation.isLoading}
            >Update profile</Button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Settings
