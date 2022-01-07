import "./auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "../home/home";
import Defaultloader from "../../components/loader/Defaultloader";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
export default function Logout(props) {
  const [state, setstate] = useState(null);
  useEffect(() => {
    axios.post("/logout", { withCredentials: true }).then((e) => {
      props.setuser(null)
      setstate(1);
    });
  }, []);
  return (
    <>
      <div style={{ height: "calc(100vh - 8vh)" }}>
        {state == null ? (
          <Defaultloader />
        ) : (
          <Router>
            <Route exact path="/logout" render={() => <Redirect to="/" push={true}/>} />
            <Route exact path="/">
              <Home />
            </Route>
          </Router>
        )}
      </div>
    </>
  );
}
