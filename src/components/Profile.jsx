
import React, { useState } from "react";
import db from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { doc, updateDoc, getDoc } from 'firebase/firestore/lite';
import './profile.css';
import storage from "../firestorage";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Profile() {

  const [account, setaccount] = useState([]);
  const [updatedAccount, setUpdatedAccount] = useState([]);
  const [showBar, setBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setLoading(false);
    setUpdatedAccount([]);
    setOldPassword("");
    setNewPassword("");
    const loadUserDetails = async () => {
      await loadUser()

    }
    loadUserDetails();
    if (sessionStorage.getItem("username") != null) {
      loadUser();
    }

  }, [count]);


  const loadUser = async () => {
    const docRef = doc(db, "account", sessionStorage.getItem("username"));
    setaccount((await getDoc(docRef)).data());
  }

  const updateProfile = async (e) => {

    e.preventDefault();
    if (updatedAccount.password != undefined && updatedAccount.password != "") {
      console.log("inside 1 if");
      if (account.password != oldPassword) {
        console.log("inside 2 if");
        alert("Old Password is incorrect");
      }
      else if (newPassword != updatedAccount.password) {
        console.log("inside 3 if");
        alert("Please confirm the new password");
      }
      else {
        console.log("inside 4 if");
        updateAccountApi();
      }
    }
    else {
      console.log("inside 5 if");
      console.log(updatedAccount);
      updateAccountApi();
    }
  }

  const updateAccountApi = async () => {
    setLoading(true);
    const docRef = doc(db, 'account', sessionStorage.getItem("username"))
    await updateDoc(docRef, { ...account, ...updatedAccount });
    setCount(count + 1);
  }


  const uploadAvatar = (e) => {

    const file = e.target.files[0];
    const storageRef = ref(storage, `avatar/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setBar(true);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressValue);
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpdatedAccount({ ...updatedAccount, avatar: downloadURL });
          setBar(false);
          setProgress(0);

        });
      }

    );
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdatedAccount({ ...updatedAccount, [id]: value });
  }

  return (
    <>


      <div class="editprofile">
        <div class="row flex-lg-nowrap">
          <div class="col">
            <div class="row">
              <div class="col mb-2">
                <div class="card">
                  <div class="card-body">
                    <div class="e-profile">
                      <div class="row">
                        <div class="col-12 col-sm-auto mb-3">
                          <div class="mx-auto" style={{ width: "140px;" }}>
                            <div class="d-flex justify-content-center align-items-center rounded" style={{ height: "140px", backgroundColor: " rgb(233, 236, 239);" }}>
                              <img src={account.avatar} class="rounded-circle" alt="" style={{ width: "100px", height: "100px" }} />
                            </div>
                          </div>
                        </div>
                        <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div class="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{account["name"]}</h4>
                            <p class="mb-0">@{account["username"]}</p>
                            <div class="mt-2">
                              <input
                                id="avatar"
                                onChange={uploadAvatar}
                                type="file"
                                className="hide"
                              />
                              <label class="btn btn-primary" type="submit" for="avatar">
                                <span for="avatar">Change Photo</span>
                              </label>
                            </div>
                            <div className={showBar ? "profile_imageInput" : "hide"}>
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
                          </div>
                        </div>
                      </div>
                      <ul class="nav nav-tabs">
                        <li class="nav-item"><a href="" class="active nav-link">Settings</a></li>
                      </ul>
                      <div class="tab-content pt-3">
                        <div class="tab-pane active">
                          <form class="form" novalidate="">
                            <div class="row">
                              <div class="col">
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Full Name</label>
                                      <input class="form-control" type="text" onChange={handleChange} name="name" id="name" placeholder={account.name} value={updatedAccount.name} />
                                    </div>
                                  </div>
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Username</label>
                                      <input class="form-control" type="text" onChange={handleChange} disabled id="username" name="username" placeholder={account.username} value={account.username} />
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Email</label>
                                      <input class="form-control" onChange={handleChange} type="email" disabled placeholder={account.email} value={account.email} />
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="row">
                                  <h6>Date Of Birth {account.dob} </h6>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div class="row">
                              <div class="col-12 col-sm-6 mb-3">
                                <div class="mb-2"><b>Change Password</b></div>
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Current Password</label>
                                      <input class="form-control" type="password" placeholder="Enter Old Password" value={oldPassword}
                                        onChange={(e) => { setOldPassword(e.target.value) }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>New Password</label>
                                      <input class="form-control" type="password" id="password" onChange={handleChange}
                                        value={updatedAccount.password} placeholder="••••••" />
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                                      <input class="form-control" id="password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type="password" placeholder="••••••" /></div>
                                  </div>
                                </div>
                              </div>

                            </div>
                            <div class="row">

                              <div class="col d-flex justify-content-end">

                                <button class="btn btn-primary load" onClick={updateProfile} type="submit" disabled={loading}>
                                  <div className={loading ? "load" : "hide"}>  <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span> </div>
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>


    </>

  );
}

export default Profile;