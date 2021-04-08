import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import Input from "../../Components/Input"
import Form from "../../Components/Form"
import TextArea from "../../Components/TextArea"
import Button from "../../Components/Button"
import Error from "../../Components/Error"
import { Link } from "react-router-dom"
import axios from "axios"

const FirstPage = ({
  onSubmit,
  fields,
  setFields,
}) => {
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isSubmitDisabled()) {
      try {
        await axios.get(`/auth/check?email=${fields.email}`)
        onSubmit()
      } catch({ response }) {
        setError(response.data.message)
      }
    }
  }

  const isSubmitDisabled = () => {
    return fields.email === "" || fields.password === ""
  }

  return (
    <>
      <Error className="mb-4" show={error}>{error}</Error>
      <Form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input
            className="mb-2" label="Email" type="email" name="email" autocompleteOff required
            value={fields.email}
            onChange={(e) => setFields({...fields, email: e.target.value})}
          />
          <Input
            label="Set Password" type="password" name="password" autocompleteOff required
            value={fields.password}
            onChange={(e) => setFields({...fields, password: e.target.value})}
          />
        </div>

        <Button
          className="w-full"
          disabled={isSubmitDisabled()}
        >
          Next
        </Button>
      </Form>
    </>
  )
}

const SubmitPage = ({
  onPrevious,
  fields,
  setFields
}) => {
  const [error, setError] = useState(null)
  const { setUser } = useContext(AuthContext)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isSubmitDisabled()) {
      try {
        const registerResult = await axios.post(`/auth/register`, fields)

        setUser(registerResult.data)
        history.push(`/${registerResult.data.username}`)
      } catch({ response }) {
        setError(response.data.message)
      }
    }
  }

  const handlePrevious = (e) => {
    e.preventDefault()
    onPrevious()
  }

  const isSubmitDisabled = () => {
    return fields.email === "" || fields.password === "" || fields.name === "" || fields.username === ""
  }

  return (
    <>
      <Error className="mb-4" show={error}>{error}</Error>
      <Form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input
            className="mb-2" label="Name" name="name" autoFocus={true} autocompleteOff required
            value={fields.name}
            onChange={(e) => setFields({...fields, name: e.target.value})}
          />
          <Input
            className="mb-2" label="Username" name="username" autocompleteOff required
            value={fields.username}
            onChange={(e) => setFields({...fields, username: e.target.value})}
          />
          <TextArea
            className="mb-2 max-h-28" label="Profile Description" name="description" autocompleteOff
            value={fields.description}
            onChange={(e) => setFields({...fields, description: e.target.value})}
          />
          <Input
            label="Website" name="website" autocompleteOff
            value={fields.website}
            onChange={(e) => setFields({...fields, website: e.target.value})}
          />
        </div>

        <Button 
          className="mb-2 w-full" type="button"
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          className="w-full" variant="primary" type="submit"
          disabled={isSubmitDisabled()}
        >
          Register
        </Button>
      </Form>
    </>
  )
}

const Register = () => {
  const [page, setPage] = useState(0)
  const [fields, setFields] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    description: "",
    website: "",
  })

  const next = () => setPage(1)

  const previous = () => setPage(0)

  return (
    <div className="max-w-xs m-auto">
      <div className="mb-5">
        <h2 className="mb-0">Register</h2>
        {page === 0 ? (
        <div className="text-xs">Get started with <span className="font-semibold">hoji</span>!</div>
        ) : (
        <div className="text-xs">We just need a few more details then you are good to go!</div>
        )}
      </div>

      {page === 0 ? (
        <FirstPage 
          onSubmit={next}
          fields={fields}
          setFields={setFields}
        />
      ) : (
        <SubmitPage
          onPrevious={previous}
          fields={fields}
          setFields={setFields}
        />
      )}
      <div className="text-center mt-2 text-xs">Already have an account? <Link to="/login">Login</Link></div>
    </div>
  )
}

export default Register
