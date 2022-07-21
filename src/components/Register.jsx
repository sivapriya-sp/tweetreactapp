import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc, setDoc } from 'firebase/firestore/lite';
import db from "../firebase";
import { Redirect } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import "./Login.css";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';




function Register() {
    const [loginButton, setLoginButton] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const [errormsg, seterrormsg] = useState("");
    const [loadLogin, setLogin] = useState(false);
    const [loadRegister, setRegister] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [state, setState] = useState({
        email: "",
        password: "",
        username: "",
        dob: "",
        name: ""

    })
    useEffect(() => {
        CheckUsername();
        CheckEmail();
    }, [state.username, state.email])

    const CheckUsername = async () => {
        if (state.username !== "") {
            const docRef = doc(db, "account", state.username);
            const docSnap = await getDoc(docRef)

            if (docSnap.data() !== undefined) {
                alert("Username already exists");
                setState({ ...state, username: "" });
            }
        }
    }

    const CheckEmail = async () => {
        if (state.email !== "") {
            const docRef = doc(db, "account", state.email);
            const docSnap = await getDoc(docRef)

            const q = query(collection(db, "account"), where("email", "==", state.email));

            const querySnapshot = await getDocs(q);

            //console.log(querySnapshot._docs.length);

            if (querySnapshot._docs.length === 1) {
                alert("Email already exists");

                setState({ ...state, email: "" });
            }
        }
    }



    const register = async (e) => {

        e.preventDefault();

        if (state.username !== "" && state.email !== "" && state.password !== "" && state.dob !== "" && state.name !== "") {
            setLoading(true);
            await setDoc(doc(db, "account", state.username), state).then(() => {

                alert("Registered Successfully")
                setLogin(true);

            });
        }
        else {
            handleClick("Please fill all the details");
        }




    }




    const handleChange = (e) => {


        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))


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



    if (loadLogin === true) return <Redirect to={'/login'} push />

    return (
        <>
            <div>
                <div class="containerr">
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
                    <div class="flex-item1 left">
                        <ul class='insideLeft'>
                            <li> <i class="fas top fa-search"></i>Follow Your Interset.</li>
                            <li>
                                <i class="fab middle fa-twitter"></i>
                                What people are talking about.</li>
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
                                <li class="change"> Sign up </li>
                                <li>
                                    <  TextField className="text" id="username" label="Username" variant="standard"
                                        value={state.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <li>
                                    <  TextField className="text" id="email" label="Email" variant="standard"
                                        value={state.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <li>
                                    <  TextField className="text" id="password" label="Password" variant="standard"
                                        type="password"
                                        value={state.password}
                                        onChange={handleChange}
                                        required

                                    />
                                </li>
                                <li>
                                    <  TextField className="text" id="name" label="Full Name" variant="standard"
                                        value={state.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>

                                <li>
                                    <label className="date" htmlFor="dob">Date of Birth</label></li><li>
                                    <  input type="date" className="date" id="dob" label="Date Of Birth" variant="standard"
                                        value={state.dob}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <li>     <LoadingButton
                                    onClick={register}
                                    loading={loading}
                                    disabled={loginButton}
                                    variant="outlined"
                                >
                                    Register
                                </LoadingButton></li>
                                <li style={{ padding: "0px 6em" }}  >or</li>
                                <li><LoadingButton onClick={() => setLogin(true)}  >Login</LoadingButton></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontSize: '24px' }}>
                        {errormsg}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )

}

export default Register;