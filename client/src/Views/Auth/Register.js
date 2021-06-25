import React, { useState, useContext } from "react"
import { useMutation } from "react-query"
import { useHistory, Redirect } from "react-router-dom"
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
  const checkMutation = useMutation(() => axios.post(`/auth/check?email=${fields.email}`), {
    onSuccess: () => onSubmit()
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isSubmitDisabled()) {
      checkMutation.mutate()
    }
  }

  const isSubmitDisabled = () => {
    return checkMutation.isLoading || fields.email === ""
  }

  return (
    <>
      <Error className="mb-4" error={checkMutation.error} />
      <Form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input
            className="mb-2" label="Email" type="email" name="email" autoCompleteOff autoFocus required 
            maxLength="255"
            value={fields.email}
            onChange={(e) => setFields({...fields, email: e.target.value})}
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
  const registerMutation = useMutation((fields) => axios.post(`/auth/register`, fields), {
    onSuccess: ({ data }) => {
      setUser(data)
      history.push(`/${data.username}`)
    }
  })

  const { setUser } = useContext(AuthContext)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    registerMutation.mutate(fields)
  }

  const handlePrevious = (e) => {
    e.preventDefault()
    onPrevious()
  }

  const isSubmitDisabled = () => {
    return registerMutation.isLoading || fields.email === "" || fields.password === "" || fields.name === "" || fields.username === ""
  }

  return (
    <>
      <Error className="mb-4" error={registerMutation.error} />
      <Form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input
            className="mb-2" label="Name" name="name" autoFocus={true} autocompleteOff required
            minLength="2"
            maxLength="50"
            value={fields.name}
            onChange={(e) => setFields({...fields, name: e.target.value})}
          />
          <Input
            className="mb-2" label="Username" name="username" autocompleteOff required
            minLength="2"
            maxLength="20"
            value={fields.username}
            onChange={(e) => setFields({...fields, username: e.target.value})}
          />
          <Input
            label="Set Password" type="password" name="password" autoCompleteOff required
            maxLength="255"
            value={fields.password}
            onChange={(e) => setFields({...fields, password: e.target.value})}
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
  })
  const { user } = useContext(AuthContext)

  const next = () => setPage(1)

  const previous = () => setPage(0)

  if (user) {
    return <Redirect to={`/${user.username}`} />
  }

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
      <div className="text-center mt-2 text-xs">Already have an account? <Link className="color" to="/login">Login</Link></div>
    </div>
  )
}

export default Register
