import Head from "next/head"
import Header from "../components/Header"
import ContentWrapper from "../components/ContentWrapper"
import { useState, useEffect } from "react"
import { useMutation } from "react-query"
import { useRouter } from "next/router"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useAuth } from "../contexts/auth"
import FormInput from "../components/FormInput"
import NextLink from "../components/NextLink"
import { Button } from "../ui"
import { clientQuery } from "../lib/axios"

const FirstPage = ({
  onSubmit,
  fields,
  setFields,
}) => {
  const checkMutation = useMutation((email) => clientQuery().post(`/auth/check?email=${email}`), {
    onSuccess: () => {
      onSubmit()
    }
  })

  return (
    <>
      {/*
      <Error className="mb-4" error={checkMutation.error} />
      */}

      <Formik
        initialValues={{ email: fields.email }}
        validationSchema={Yup.object({
         email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={(values) => {
          setFields({...fields, email: values.email})
          checkMutation.mutate(values.email)
        }}
      >
        <Form>
          <div className="mb-5">
            <FormInput
              className="mb-2" 
              label="Email" type="email" name="email" autoFocus 
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
  fields,
}) => {
  const { setUser } = useAuth()
  const router = useRouter()

  const registerMutation = useMutation((values) => clientQuery().post(`/auth/register`, values), {
    onSuccess: ({ data }) => {
      setUser(data)
      router.push(`/${data.username}`)
    }
  })

  const handlePrevious = (e) => {
    e.preventDefault()
    onPrevious()
  }

  return (
    <>
      {/*
      <Error className="mb-4" error={registerMutation.error} />
      */}

      <Formik
        initialValues={{ name: fields.name, username: fields.username, password: fields.password }}
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
          registerMutation.mutate({
            ...fields,
            ...values
          })
        }}
      >
        <Form>
          <div className="mb-5">
            <FormInput
              className="mb-2" label="Name" name="name" autoFocus
              minLength="1"
              maxLength="50"
            />
            <FormInput
              className="mb-2" label="Username" name="username"
              minLength="4"
              maxLength="20"
            />
            <FormInput
              label="Set Password" type="password" name="password"
              minLength="4"
              maxLength="255"
            />
          </div>

          <Button 
            className="mb-2 w-full"
            type="button"
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            className="w-full" 
            variant="primary" 
            type="submit"
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
  const [fields, setFields] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  })

  const { user } = useAuth()

  const next = () => setPage(1)

  const previous = () => setPage(0)

  return (
    <>
      <Head>
        <title>Register | hoji</title>
      </Head>

      <Header />

      <ContentWrapper>
        <div className="max-w-xs m-auto">
          <div className="mb-10">
            <h2 className="mb-0">Register</h2>
            {page === 0 ? (
            <div className="text-sm">Get started with <span className="font-semibold">hoji</span>!</div>
            ) : (
            <div className="text-sm">We just need a few more details then you are good to go!</div>
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
          />
          )}
          <div className="text-center mt-2 text-xs">
            Already have an account?{" "}
            <NextLink className="color" href="/login">Login</NextLink>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}

export default Register
