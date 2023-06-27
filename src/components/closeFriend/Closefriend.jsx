import React from 'react'
import "./closeFriend.css"
const Closefriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriendList">
      <img src={PF + user.profilePicture} alt="" className="sidebarProfile" />
      <span className="sidebarProfileName">{user.username}</span>
    </li>
  )
}

export default Closefriend