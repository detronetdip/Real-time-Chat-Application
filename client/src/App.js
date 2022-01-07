import Home from "./pages/home/home";
import Myhome from "./pages/home_/Myhome";
import Chatpage from "./pages/chat-page/Chatpage";
import Logreg from "./pages/auth/Logreg";
import Logout from "./pages/auth/Logout";
import "./components/topbar/topbar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Fullloader from "./components/loader/Fullloader";
import View from "./pages/view/View";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
export default function App() {
  const [user, setUser] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [viewUser, setviewUser] = useState(0);
  useEffect(() => {
    axios.post("/info").then((e) => {
      setLoaded(true);
      setUser(e.data);
    });
  }, []);
  return (
    <>
      {!loaded ? (
        <Fullloader />
      ) : (
        <Router>
          <div className="top">
            <div className="title">
              <div className="top-left">
                <img src="/images/android-chrome-512x512.png" alt="" />
                <h2>-chAt</h2>
              </div>
              <div
                className="top-right"
                style={{ display: "flex", alignItems: "center" }}
              >
                {!user ? (
                  <Link to="/auth">
                    <button>Login</button>
                  </Link>
                ) : (
                  <>
                    <Link to="/chat">
                      <box-icon
                        name="send"
                        title="chat"
                        size="lg"
                        color="white"
                        style={{
                          fontSize: "1rem",
                          backgroundColor: "#2d88ff",
                          padding: "0.4rem",
                          borderRadius: "50%",
                        }}
                      ></box-icon>
                    </Link>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Link to="/logout">
                      <button>Logout</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <Switch>
            <Route path="/" exact>
              {user != null ? (
                <Myhome uid={user.uid} view={setviewUser} setUser={setUser} />
              ) : (
                <Home />
              )}
            </Route>
            <Route path="/chat" exact>
              <Chatpage user={user} nm={arrival} snm={setArrival} />
            </Route>
            <Route path="/auth" exact>
              <Logreg setuser={setUser} />
              {user != null ? <Redirect to="/" push={true} /> : ""}
            </Route>
            <Route path="/register" exact>
              <Logreg />
            </Route>
            <Route path="/logout" exact>
              <Logout setuser={setUser} />
            </Route>
            <Route path="/view/:uid">
              <View user={viewUser} />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}
