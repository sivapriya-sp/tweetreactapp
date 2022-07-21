import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post";
import db from "../firebase";
import storage from "../firestorage";
import {  collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import "./TweetBox.css";
import { addDoc } from "firebase/firestore/lite";
import { Avatar, Button } from "@material-ui/core";
import {  getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [account, setaccount] = useState([]);
  const [count, setCount] = useState(0);
  const [progress, setprogress] = useState(0);
  const [showBar, setBar] = useState(false);
  const [imageName, setImageName] = useState("Upload Photo");

  const divStyle = {

    height: '75%',
    width: '100%',
    float: 'left',


  };
  useEffect(() => {

    const postCol = collection(db, 'posts');
    getDocs(postCol).then(
      (postSnapshot) => {
        setPosts(postSnapshot.docs.map(doc => doc.data()));
      })

    if (sessionStorage.getItem("username") != null) {
      loadUser();
    }

  }, [count]);


  const loadUser = async () => {
    const docRef = doc(db, "account", sessionStorage.getItem("username"));
    setaccount((await getDoc(docRef)).data());

  }

  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = async (e) => {
    e.preventDefault();


    if (sessionStorage.getItem("username") != null) {

      await addDoc(collection(db, "posts"), {
        username: account.username,
        displayName: account.name,
        avatar: account.avatar == null ? " " : account.avatar,
        verified: true,
        text: tweetMessage,
        image: tweetImage,
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        setImageName("Upload Photo");
        setCount(count + 1);
      })
    }
    else {
      alert("Please Login to Tweet");
    }
    setTweetMessage("");
    setTweetImage("");
  };

  const uploadmedia = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setBar(true);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progressValue + '% done');
        setprogress(progressValue);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setTweetImage(downloadURL);
          setImageName(file.name + " is selected");
          setBar(false);
          setprogress(0);
        });
      }
    );
  }

  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h2>Home</h2>
        </div>
        <div className="tweetBox">
          <form>
            <div className="tweetBox__input">
              <Avatar src={account.avatar} />
              <TextField
                className="Text"
                id="standard-multiline-flexible"
                variant="standard"

                label="What's happening?"
                multiline
                maxRows={4}
                value={tweetMessage}
                onChange={(e) => setTweetMessage(e.target.value)}
              />
            </div>
            <input
              id="img"
              onChange={uploadmedia}
              type="file"
              className="hide"
            />
            <div className="label_around">   <label className="label__imageInput" for="img">{imageName}</label>
            </div>
            <div className={showBar ? "tweetBox__imageInput" : "hide"}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}   >
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round(
                    progress,
                  )}%`}</Typography>
                </Box>
              </Box>
            </div>
            <Button onClick={sendTweet} type="submit" className="tweetBox__button">
              Tweet
            </Button>
          </form>
        </div>
        <div style={divStyle} >
          {posts.map((post) => (
            <Post
              displayName={post.displayName}
              username={post.username}
              verified={post.verified}
              text={post.text}
              avatar={post.avatar}
              image={post.image}
            />
          ))}
        </div></div>
    </>
  );
}

export default Feed;