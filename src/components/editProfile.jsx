import React from "react";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import "../App.css";
import Profile from "./Profile";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
            <div className="app">

                <Sidebar />
                {/* <Feed />  */}
                <Profile />
                <Widgets />
            </div>
        );
    }
}

export default EditProfile;