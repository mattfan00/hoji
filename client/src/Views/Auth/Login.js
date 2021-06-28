import React, { useState, useContext } from "react"
import { useHistory, Redirect } from "react-router-dom"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Input from "../../Components/Input"
import { useMutation } from "react-query"
import Button from "../../Components/Button"
import Error from "../../Components/Error"
import { Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../Context/AuthContext"

const Login = () => {
  const loginMutation = useMutation((fields) => axios.post("/auth/login", fields), {
    onSuccess: ({ data }) => {
      setUser(data)
      history.push(`/${data.username}`)
    }
  })

  const history = useHistory()
  const { user, setUser } = useContext(AuthContext)

  if (user) {
    return <Redirect to={`/${user.username}`} />
  }

  return (
    <div className="max-w-xs m-auto">
      <div className="mb-5">
        <h2 className="mb-0">Login</h2>
        <div className="text-xs">Welcome back to <span className="font-semibold">hoji</span>!</div>
      </div>

      <Error className="mb-4" error={loginMutation.error} />

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
         email: Yup.string().email('Invalid email address').required('Required'),
         password: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
          loginMutation.mutate(values)
        }}
      >
        <Form>
          <div className="mb-5">
            <Input 
              className="mb-2" 
              label="Email" type="email" name="email" autoFocus autoCompleteOff
              maxLength="255"
            />

            <Input 
              className="mb-2" 
              label="Password" type="password" name="password" autoCompleteOff
              maxLength="255"
            />
          </div>

          <Button
            className="w-full" variant="primary"
            type="submit"
            disabled={loginMutation.isLoading}
           >Login</Button>
        </Form>
      </Formik>

      {/* <div className="mb-4 text-xs">Forgot password?</div> */}
      <div className="text-center mt-2 text-xs">Don't have an account? <Link className="color" to="/register">Register</Link></div>
    </div>
  )
}

export default Login
