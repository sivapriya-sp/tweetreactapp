import React,{ Component } from "react";
import "./App.css";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Link, } from "react-router-dom";
import { Switch } from "react-router-dom";
import EditProfile from "./components/editProfile";


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
     
      
  
  
  }
 
}



  render() {
   
  
    
    return (
     



      <div >
       
        <Router>
    
          <div >
           

   

            {/* <Dialog 
            header="Confirmation to logout:"
            visible={this.state.dialog_visible}
            // style={{width:"30vw"}}
            onHide={this.onHide}>
              <h5>Are you sure you want to logout</h5>
              <Button label="Logout" icon="pi pi-check" onClick={this.logout} className="p-button-secondary" />{" "}
              <Button label="Cancel" icon="pi pi-times" onClick={this.onHide}/> 
            </Dialog> */}


            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/profile" component={EditProfile}></Route>
            
            
            </Switch>
          </div>
        </Router>
        <footer className="bg-black text-center text-white-50">
          Copyright &copy; Anish M Raghavendra
    </footer>
      </div>
    );
  }
}



export default App ;
