import "./topbar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
export default function Topbar() {
  return (
    <div className="top">
      <div className="title">
        <div className="top-left">
          <img src={process.env.REACT_APP_Image} alt="" />
          <h2>-chAt</h2>
        </div>
        <div className="top-right">
          <Router>
            <Link to="/chat">
              <button>Login</button>
            </Link>
          </Router>
        </div>
      </div>
    </div>
  );
}
