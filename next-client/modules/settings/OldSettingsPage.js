import { useState, useRef } from "react"
import { useMutation } from "react-query"
import { queryClient } from "../../lib/query"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button } from "../../ui/Button"
import FormInput from "../../components/FormInput"
import FormTextArea from "../../components/FormTextArea"
import { clientQuery } from "../../lib/axios"
import { useAuth } from "../../contexts/auth"


const Settings = () => {
  const updateMutation = useMutation(fields => clientQuery().put(`/user/${user.username}`, fields), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/auth/me`)
    },
  })

  const uploadMutation = useMutation(formData => clientQuery().put(`/user/${user.username}/avatar`, formData), {
    onSuccess: ({ data }) => setAvatar(data)
  })

  const removeMutation = useMutation(() => clientQuery().delete(`/user/${user.username}/avatar`), {
    onSuccess: () => setAvatar("")
  })

  const { user } = useAuth()
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
        {/*
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
        */}

        {/*
        <Error className="mb-4" error={updateMutation.error} />
        */}

        <Formik
          initialValues={{ 
            name: user.name || "",
            username: user.username || "",
            description: user.description || "",
            website: user.website || "",
            location: user.location || "",
          }}
          validationSchema={Yup.object({
           name: Yup.string()
            .min(1, "Must be at least ${min} characters")
            .max(50, "Must be at most ${max} characters")
            .required('Required'),
           username: Yup.string()
            .min(4, "Must be at least ${min} characters")
            .max(20, "Must be at most ${max} characters")
            .matches("^[a-zA-Z0-9_]*$", "Must contain letters, numbers, or '_'")
            .required('Required'),
           description: Yup.string()
            .max(280, "Must be at most ${max} characters"),
           website: Yup.string()
            .max(280, "Must be at most ${max} characters")
            .url(),
           location: Yup.string()
            .max(100, "Must be at most ${max} characters")
          })}
          onSubmit={(values) => {
            updateMutation.mutate(values)
          }}
        >
          <Form>
            <div className="mb-5">
              <FormInput 
                className="mb-4" label="Name" name="name" 
                autoComplete="off"
                minLength="1"
                maxLength="50"
              />

              <FormInput 
                className="mb-4" label="Username" name="username" 
                minLength="4"
                maxLength="20"
              />

              <FormTextArea 
                className="mb-4 max-h-28" label="Description" name="description" 
                maxLength="280"
              />

              <FormInput 
                className="mb-4" label="Website" name="website" 
                autoComplete="off"
                maxLength="280"
              />

              <FormInput 
                className="mb-4" label="Location" name="location" 
                autoComplete="off"
                maxLength="100"
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
