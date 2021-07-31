import { useRouter } from "next/router"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormInput from "../components/FormInput"
import NextLink from "../components/NextLink"
import { useMutation } from "react-query"
import { Button } from "../ui"
import { clientQuery } from "../lib/axios"
import { useAuth } from "../contexts/auth"
 
const LoginPage = () => {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const loginMutation = useMutation((fields) => clientQuery().post("/auth/login", fields), {
    onSuccess: ({ data }) => {
      setUser(data)
      router.push(`/${data.username}`)
    }
  })

  /*
  if (user) {
    return <Redirect to={`/${user.username}`} />
  }
  */

  return (
    <>
      <div className="mb-10">
        <h2 className="mb-0">Login</h2>
        <div className="text-sm">Welcome back to <span className="font-semibold">hoji</span>!</div>
      </div>

      {/*
      <Error className="mb-4" error={loginMutation.error} />
      */}

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
            <FormInput 
              className="mb-4" 
              label="Email" type="email" name="email" autoFocus autoCompleteOff
              maxLength="255"
            />

            <FormInput 
              className="mb-4" 
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
      <div className="text-center mt-2 text-xs">
        Don't have an account?{" "}
        <NextLink href="/register" className="color">Register</NextLink>
      </div>
    </>
  )
}

export default LoginPage
