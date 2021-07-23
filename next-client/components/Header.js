import { Button } from "../ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Header({ profile }) {
  return (
    <header className="max-w-3xl mx-auto mt-20 mb-10">
      <div className="flex items-center">
        {profile.avatar ? (
        <div className="w-10 h-10 rounded overflow-hidden mr-4">
          <img className="object-cover w-full h-full" alt="Avatar" src={profile.avatar} />
        </div>
        ) : ""}
        <div className="flex flex-1 items-baseline justify-between">
          <div className="flex items-baseline">
            <h2>{profile.name}</h2>
            <div className="ml-6">
              <div className="text-gray-500">About</div>
            </div>
          </div>
          <div>
            <Button className="mr-2">
              <FontAwesomeIcon icon={["fas", "bookmark"]} size="sm" />
            </Button>
            <Button>
              <FontAwesomeIcon icon="bars" size="sm" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
