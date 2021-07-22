import Header from "../../components/Header"

export default function Profile({ profile }) {
  return (
    <>
      <Header profile={profile} />
      <div className="max-w-2xl mx-auto">
        hello
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { username } = params

  const res = await fetch(`http://localhost:8080/user/${username}`)
  const data = await res.json()

  return {
    props: {
      profile: data
    }
  }
}
