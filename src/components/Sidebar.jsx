import React, { useState, Navigate } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./SidebarOption.css";
import db from "../firebase";
import { doc, getDoc } from 'firebase/firestore/lite';

function Sidebar() {


  const [loadLogin, setLogin] = useState(false);
  const [loadHome, setHome] = useState(false);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [account, setaccount] = useState([]);


  useEffect(() => {
    if (sessionStorage.getItem("username") !== null) {
      setUsername(sessionStorage.getItem("username"));
      loadUser();
    }
  }, [])


  const loadUser = async () => {
    const docRef = doc(db, "account", sessionStorage.getItem("username"));
    setaccount((await getDoc(docRef)).data());

  }

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const logout = () => {

    handleClose();
    sessionStorage.clear();
    setHome(true);
    window.location.reload();
  }


  if (loadLogin === true) return <Redirect to={'/login'} push />
  if (loadHome === true) return <Redirect to={'/'} push />

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>


      <Button variant="outlined" className="sidebar__profileIcon" fullWidth onClick={() => username != "" ? handleClickOpen() : setLogin(true)} >
        <div className="post__avatar"   >
          <Avatar src={account.avatar} />
        </div>
        {username != "" ? username : "Login"}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"  Do you wish to logout?  "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={logout} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Sidebar;