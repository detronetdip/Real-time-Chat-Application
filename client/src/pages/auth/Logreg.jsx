import "./auth.css";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
export default function Logreg(props) {
  return (
    <>
      <div className="loginmain">
        <div className="formcontainer">
          <Router>
            <Switch>
              <Route path="/auth" exact>
                <Login setTest={props.setuser}/>
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
            <div className="choice">
              <Link to="/auth">
                <span>Login</span>
              </Link>
              <span style={{color:"white"}}>|</span>
              <Link to="/register">
                <span>Register</span>
              </Link>
            </div>
          </Router>
        </div>
      </div>
    </>
  );
}
