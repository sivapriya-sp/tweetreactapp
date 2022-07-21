import React from "react";
import "./SidebarOption.css";
import { Redirect } from "react-router-dom";

function SidebarOption({ text, Icon }) 
{
  const [loadProfile, setLoadProfile] = React.useState(false);
  const [loadHome, setLoadHome] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const handleClick=(e)=>{
    console.log(e.target.innerText);
    if(e.target.innerText==="Profile")
    {
      if(sessionStorage.getItem("username")!=null)
    {
      setLoadProfile(true);
    }
    else
    { 
      alert("Please Login First");
    }
     
    }
    else if(e.target.innerText==="Home")
    {
      setLoadHome(true);
      
    }
  }
  
  if(loadProfile===true)return<Redirect to ={'/profile'} push/>
  if(loadHome===true)return<Redirect to ={'/'} push/>
  return (
    <div className=  "sidebarOption "   >
     <div className="space"> <Icon /> </div>
      <h2 onClick={handleClick} value={text}>{text}</h2>

    </div>
  );
}

export default SidebarOption;