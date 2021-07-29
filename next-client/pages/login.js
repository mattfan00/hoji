import Head from "next/head"
import Header from "../components/Header"
import ContentWrapper from "../components/ContentWrapper"
import LoginPage from "../modules/LoginPage"

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | hoji</title>
      </Head>

      <Header />

      <ContentWrapper size="sm">
        <LoginPage />
      </ContentWrapper>
    </>
  )
}

export default Login
