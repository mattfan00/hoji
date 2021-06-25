import React, { useState, useContext } from "react"
import { useHistory, Redirect } from "react-router-dom"
import Input from "../../Components/Input"
import Form from "../../Components/Form"
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

  const [fields, setFields] = useState({
    email: "",
    password: "",
  })
  
  const history = useHistory()
  const { user, setUser } = useContext(AuthContext)

  const isLoginDisabled = () => {
    return loginMutation.isLoading || fields.email === "" || fields.password === ""
  }

  const login = async (e) => {
    e.preventDefault()

    if (!isLoginDisabled()) {
      loginMutation.mutate(fields)
    }
  }

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

      <Form onSubmit={login}>
        <div className="mb-5">
          <Input
            className="mb-2" 
            label="Email" type="email" name="email" required autoFocus autoCompleteOff
            maxLength="255"
            value={fields.email}
            onChange={(e) => setFields({...fields, email: e.target.value})}
          />
          <Input
            label="Password" type="password" name="password" required
            maxLength="255"
            value={fields.password}
            onChange={(e) => setFields({...fields, password: e.target.value})}
          />
        </div>

        <Button
          className="w-full" variant="primary"
          type="submit"
          disabled={isLoginDisabled()}
          //onClick={login}
         >Login</Button>
      </Form>
      {/* <div className="mb-4 text-xs">Forgot password?</div> */}
      <div className="text-center mt-2 text-xs">Don't have an account? <Link className="color" to="/register">Register</Link></div>
    </div>
  )
}

export default Login
