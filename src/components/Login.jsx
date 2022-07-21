
import React, { useState ,useEffect} from "react";
import db from "../firebase";
import "./Login.css";
import {Redirect} from 'react-router-dom';

import { getFirestore, collection, getDocs ,doc ,getDoc} from 'firebase/firestore/lite';

import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import 'bootstrap/dist/css/bootstrap.min.css';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {


    const [loginButton, setLoginButton] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, seterrormsg] = useState("");
    const [loadLogin, setLogin] = useState(false);
    const [loadRegister, setRegister] = useState(false);
    const [open, setOpen] = React.useState(false);
  
  useEffect(() => {   
    sessionStorage.clear();
  }, []);


    const verifyLogin  = async ()=>    
    {
      setLoading(true);
        setLoginButton(true);
        const docRef = doc(db, "account", username);
        const docSnap = await getDoc(docRef)
        
            if(docSnap.data() !== undefined)
            {
              
            if( docSnap.data().password === password)
              {
                console.log(username, password);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("name", docSnap.data().name);
                console.log("Login Successfull");
                setLogin(true);
                setLoginButton(false);
              }
              else
              {
                handleClick("Invalid Password");
                setLoginButton(false);
                setPassword("");
              }
            }
            else{
              handleClick("Invalid Username");
              
              setLoginButton(false);
              setUsername("");
              setPassword("");
            }   
    }

    if(loadLogin===true)return<Redirect to ={'/'} push/>
    if(loadRegister===true)return<Redirect to ={'/register'} push/>

    
  
    function handleSubmit(event) 
    {
        if (username === "" || password === "") 
        {
            setLoginButton(true);
            handleClick("Please enter all the fields");
        }
        else
        {
          verifyLogin();
        }     
         event.preventDefault();
    }


      const handleClick = (msg) => {
        setOpen(true);
        setLoading(true);
        seterrormsg(msg);
      };
    
      const handleClose = () => {
        setLoginButton(false);
        setLoading(false);
        seterrormsg("");
       setOpen(false);
      };

      const loadSignUp =()=>
      {
        setRegister(true);
      }

    

  return (
<>

<div class="containerr">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
<div class="flex-item1 left">   
       <ul class='insideLeft'>
        <li> <i class="fas top fa-search"></i>Follow Your Interset.</li>
      <li>
        <i class="fab middle fa-twitter"></i>
          people what think..</li>
           <li> <i class="far bottom fa-comments"> </i>Join the Conversation.</li>
           </ul>
               </div>
               <div class="flex-item2 right"> 
                <div class="first-inside right">
                   <form></form>
               </div>
               <div class="second-inside right">
               <ul>
  
              <li>
           <i id='tweet' class="fab fa-twitter"></i> </li>
          <li class="change"> See whats happening in<br /> the world right now </li>
        <li>Join Twitter Today.</li>
           <li><LoadingButton onClick={loadSignUp} >Sign up</LoadingButton></li>
           <li class="change"> <br /> Login now </li>
        <li>
          <  TextField  className="text" id="standard-basic" label="Username" variant="standard"        
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required       
        />
      </li>
      <li>   
     <  TextField  className="text" id="standard-basic" label="Password" variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        
        />
</li>
<li>     <LoadingButton
        onClick={handleSubmit}
        loading={loading}
        disabled={loginButton}
        variant="outlined"
      >
       Login
      </LoadingButton></li>             
       </ul>
      </div>
</div>
</div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{  vertical: 'bottom',horizontal: 'right' }}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                   {errormsg}
            </Alert>
      </Snackbar>
    </>
  );
}

export default Login;