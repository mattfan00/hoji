import HomePage from "../modules/HomePage"
import Header from "../components/Header"
import ContentWrapper from "../components/ContentWrapper"

const Home = () => {
  return (
    <>
      <Header /> 

      <ContentWrapper>
        <HomePage />
      </ContentWrapper>
    </>
  )
}

export default Home
