import React from 'react'
import './online.css'

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className='rightbarProfileImg' src={PF + user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
        <span className="rightbarUsername">{user.username}</span>
      </div>
    </li>
  )
}

export default Online