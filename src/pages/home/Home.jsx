import React, { useContext, useEffect, useState } from 'react'
import "./home.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'

import { io } from "socket.io-client"
import { AuthContext } from '../../context/AuthContext'
const Home = () => {
  const { user } = useContext(AuthContext)
  const [socket, setSocket] = useState(null)
  // const socket = useRef();

  // console.log(user)

  useEffect(() => {
    setSocket(io('http://localhost:8900'));
    // socket = io("ws://localhost:8900");

    // socket.emit("addUser",  user._id);

  }, []);
  useEffect(() => {

    socket?.emit("addUser", user);


  }, [socket, user]);
  // console.log(socket)
  // console.log(user)


  return (
    <>
      <Topbar socket={socket} />
      <div className="homeContainer">
        <Sidebar />
        <Feed socket={socket} user={user} />
        <Rightbar />
      </div>


    </>


  )
}

export default Home