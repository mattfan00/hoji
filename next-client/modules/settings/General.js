import { useMutation } from "react-query"
import { queryClient } from "../../lib/query"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button } from "../../ui/Button"
import FormInput from "../../components/FormInput"
import FormTextArea from "../../components/FormTextArea"
import { clientQuery } from "../../lib/axios"
import { useAuth } from "../../contexts/auth"

const General = () => {
  const updateMutation = useMutation(fields => clientQuery().put(`/user/${user.username}`, fields), {
    onSuccess: () => {
      queryClient.invalidateQueries(`/auth/me`)
    },
  })

  const { user } = useAuth()

  return (
    <>
      <Formik
        initialValues={{ 
          name: user.name || "",
          description: user.description || "",
        }}
        validationSchema={Yup.object({
         name: Yup.string()
          .min(1, "Must be at least ${min} characters")
          .max(50, "Must be at most ${max} characters")
          .required('Required'),
         description: Yup.string()
          .max(280, "Must be at most ${max} characters"),
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

            <FormTextArea 
              className="mb-4 max-h-28" label="Description" name="description" 
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
    </>
  )
}

export default General
