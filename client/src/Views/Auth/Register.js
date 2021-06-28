import React, { useState, useContext } from "react"
import { useMutation } from "react-query"
import { useHistory, Redirect } from "react-router-dom"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../../Context/AuthContext"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import Error from "../../Components/Error"
import { Link } from "react-router-dom"
import axios from "axios"

const FirstPage = ({
  onSubmit,
}) => {
  const checkMutation = useMutation((email) => axios.post(`/auth/check?email=${email}`), {
    onSuccess: () => onSubmit()
  })

  return (
    <>
      <Error className="mb-4" error={checkMutation.error} />

      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
         email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={(values) => {
          checkMutation.mutate(values.email)
        }}
      >
        <Form>
          <div className="mb-5">
            <Input
              className="mb-2" 
              label="Email" type="email" name="email" autoCompleteOff autoFocus 
              maxLength="255"
            />
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={checkMutation.isLoading}
           >Next</Button>
        </Form>
      </Formik>
    </>
  )
}

const SubmitPage = ({
  onPrevious,
}) => {
  const registerMutation = useMutation((fields) => axios.post(`/auth/register`, fields), {
    onSuccess: ({ data }) => {
      setUser(data)
      history.push(`/${data.username}`)
    }
  })

  const { setUser } = useContext(AuthContext)
  const history = useHistory()

  const handlePrevious = (e) => {
    e.preventDefault()
    onPrevious()
  }

  return (
    <>
      <Error className="mb-4" error={registerMutation.error} />

      <Formik
        initialValues={{ name: "", username: "", password: "" }}
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
         password: Yup.string()
          .min(4, "Must be at least ${min} characters")
          .required('Required'),
        })}
        onSubmit={(values) => {
          registerMutation.mutate(values)
        }}
      >
        <Form>
          <div className="mb-5">
            <Input
              className="mb-2" label="Name" name="name" autoFocus autoCompleteOff 
              minLength="1"
              maxLength="50"
            />
            <Input
              className="mb-2" label="Username" name="username" autoCompleteOff 
              minLength="4"
              maxLength="20"
            />
            <Input
              label="Set Password" type="password" name="password" autoCompleteOff 
              minLength="4"
              maxLength="255"
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
            //disabled={isSubmitDisabled()}
          >
            Register
          </Button>
        </Form>
      </Formik>
    </>
  )
}

const Register = () => {
  const [page, setPage] = useState(0)
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
        />
      ) : (
        <SubmitPage
          onPrevious={previous}
        />
      )}
      <div className="text-center mt-2 text-xs">Already have an account? <Link className="color" to="/login">Login</Link></div>
    </div>
  )
}

export default Register
