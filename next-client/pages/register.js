import Head from "next/head"
import Header from "../components/Header"
import ContentWrapper from "../components/ContentWrapper"
import RegisterPage from "../modules/RegisterPage"

const Register = () => {
  return (
    <>
      <Head>
        <title>Register | hoji</title>
      </Head>

      <Header />

      <ContentWrapper size="sm">
        <RegisterPage />
      </ContentWrapper>
    </>
  )
}

export default Register
