

import React, { useState ,useEffect} from "react";
import {Redirect} from 'react-router-dom';


function Logout() {


    const [home, setHome] = useState(false);
  useEffect(() => {   
    sessionStorage.clear();
    setHome(true);
    console.log("logout");
  }, []);

    if(home===true)return<Redirect to ={'/'} push/>


}

export default Logout;
