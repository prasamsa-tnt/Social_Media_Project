import React, { useContext, useEffect, useState } from 'react'
import "./topbar.css"
import { Person, Search, Notifications, Chat } from "@mui/icons-material"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const Topbar = ({ socket }) => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(true);
  // const handleLogout = () => {
  //   setLoggedIn(false);
  // };

  const handleProfileClick = () => {
    navigate(`/profile/${user.username}`);
  };
  const handleMessege = () => {
    navigate(`/messenger`);
  };

  const handlwLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
  // console.log(notifications)

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    }
    //  else if (type === 2) {
    //   action = "commented";
    // }
    else {
      action = "commented";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className='logo'>Social</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon' />
          <input placeholder='Search for friend, post' type="text" className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat onClick={handleMessege} />

            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem" onClick={() => setOpen(!open)}>
            <Notifications />
            {
              notifications.length > 0 &&
              <span className="topbarIconBadge">{notifications.length} </span>
            }
          </div>

        </div>
        {open && (
          <div className="notifications">
            {notifications.map((n, index) => (
              <div key={index}>{displayNotification(n)}</div>
            ))}
            <button className='btn btn-secondary' onClick={handleRead}>mark as read</button>
          </div>
        )}

        <Dropdown>
          <Dropdown.Toggle id="dropdown-profile" className="dropdown-toggle">
            <img
              src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
              alt=""
              className="topbarImage"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleProfileClick} >
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handlwLogout}>Logout</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

      </div>

    </div>
  )
}

export default Topbar