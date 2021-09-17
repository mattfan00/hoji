import Section from "./Section"
import General from "./General"
import Pages from "./Pages"

const Settings = () => {
  return (
    <>
      <Section 
        title="General"
        description="Here you can edit general information about you that will be shown on your profile."
      >
        <General />
      </Section>

      <Section 
        title="Pages"
        description="Here you can configure additional pages that visitors can view along with your blog. Some page ideas could be an about page, photos page, and projects page."
      >
        <Pages />
      </Section>
    </>
  )
}

export default Settings
