import React from "react"
import Button from "../Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProfileHeader = () => {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="mr-5 w-16 h-16 rounded-full overflow-hidden">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 16H0V0H16V16ZM11.8437 10.8927C12.383 11.3431 12.383 12.1569 11.8437 12.6073C10.8027 13.4768 9.46243 14 8 14C6.53757 14 5.19734 13.4768 4.15629 12.6073C3.61696 12.1569 3.61696 11.3431 4.15629 10.8927C5.19734 10.0232 6.53757 9.5 8 9.5C9.46243 9.5 10.8027 10.0232 11.8437 10.8927ZM10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6 4.89543 6.89543 4 8 4C9.10457 4 10 4.89543 10 6Z" fill="#e5e5e5"></path></svg>
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <h1 className="mr-3">Matthew Fan</h1>
              <div className="text-gray-400">he/him</div>
            </div>
            <div>@mattfan00</div>
          </div>
          <Button><FontAwesomeIcon icon={["far", "bookmark"]} size="lg" /></Button>
        </div>
      </div>
      <p>Senior at New York University studying Computer Science. I love to play video games, build apps, and eat food. Enjoy my content!</p>
    </>
  )
}

export default ProfileHeader