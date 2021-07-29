import Head from "next/head"
import SettingsPage from "../modules/SettingsPage"
import Header from "../components/Header"
import ContentWrapper from "../components/ContentWrapper"
import WaitForAuth from "../components/WaitForAuth"

const Settings = () => {
  return (
    <>      
      <Head>
        <title>Settings</title>
      </Head>

      <Header />

      <WaitForAuth>
        <ContentWrapper>
          <SettingsPage />
        </ContentWrapper>
      </WaitForAuth>
    </>
  )
}

export default Settings
