import axios from "axios";
import Defaultloader2 from "../../components/loader/Defaultloader2";
import { useEffect, useState } from "react";
import "./home.css";
import { useHistory } from "react-router-dom";
export default function Myhome(props) {
  const [user, setUser] = useState(null);
  const [searchRes, setSearchRes] = useState(null);
  const [state, setstate] = useState(null);
  const [friends, setFriends] = useState(null);
  const [friendreq, setFriendreq] = useState(null);
  const handelResponse = (to, accept) => {
    axios
      .put(
        "/api/respond",
        {
          to: to,
          accept: accept,
        },
        { withCredentials: true }
      )
      .then((e) => {
        fetchFriendreq();
      });
  };
  function fetchFriends() {
    axios.get("/api/friends", { withCredentials: true }).then((e) => {
      setFriends(e.data);
    });
  }
  function fetchFriendreq() {
    setFriendreq(null);
    axios.get("/api/friends/req", { withCredentials: true }).then((e) => {
      setFriendreq(e.data);
      fetchFriends();
    });
  }
  useEffect(() => {
    setUser(null);
    axios.post("/info", { withCredentials: true }).then((e) => {
      setUser(e.data);
      props.setUser(e.data)
      fetchFriendreq();
    });
  }, []);
  const search = (e) => {
    if (e.target.value.length > 0) {
      setstate(1);
    } else {
      setstate(null);
    }
    axios
      .post("/api/search", {
        si: e.target.value,
      })
      .then((e) => {
        setSearchRes(e.data);
      });
  };
  return (
    <>
      <section className="myhome">
        <div className="toprow">
          <div className="profile">
            {!user ? (
              <Defaultloader2 />
            ) : (
              <div className="wrapperProfile">
                <div className="profileImage">
                  <img src="/images/android-chrome-512x512.png" alt="" />
                  <label className="cover" htmlFor="profilepic">
                    <box-icon
                      name="camera"
                      color="#fff"
                      size="lg"
                      class="cr"
                    ></box-icon>
                  </label>
                  <input
                    type="file"
                    name="profilepic"
                    id="profilepic"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="desc">
                  <h3>{user.uname}</h3>
                  <br />
                  <h4>Friends: {user.friends}</h4>
                  <h4>Pending Request: {user.preq}</h4>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="toprow2">
          <div className="half">
            <div className="friendwrapper">
              <div className="friends">
                <h4>Friend Requests</h4>
                {friendreq != null ? (
                  friendreq.map((e) => (
                    <Friendreq name={e.name} sid={e._id} cb={handelResponse} />
                  ))
                ) : (
                  <Defaultloader2 />
                )}
              </div>
            </div>
            <br />
            <div className="friendwrapper">
              <div className="friends">
                <h4>Friends</h4>
                {friends != null ? (
                  friends.map((e) => <Friends name={e.name} />)
                ) : (
                  <Defaultloader2 />
                )}
              </div>
            </div>
          </div>
          <div className="half2">
            <div className="friendwrapper">
              <div className="friends">
                <h4>Search</h4>
                <input type="text" placeholder="search here" onInput={search} />
                {state !== null ? (
                  <div
                    className="res"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {searchRes != null ? (
                      searchRes.map((e) => (
                        <Srch dta={e.name} uid={e._id} setUser={props.view} />
                      ))
                    ) : (
                      <Defaultloader2 />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
const Friends = (props) => {
  return (
    <>
      <div className="frow">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="fimage">
            <img src="/images/android-chrome-512x512.png" alt="" />
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <div className="h4">{props.name}</div>
          </div>
        </div>
      </div>
    </>
  );
};
const Friendreq = (props) => {
  return (
    <>
      <div className="frow" style={{marginTop:"1rem"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="fimage">
            <img src="/images/android-chrome-512x512.png" alt="" />
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <div className="h4">{props.name}</div>
            <br />
            <span style={{ display: "flex" }}>
              <button
                className="adf"
                onClick={() => {
                  props.cb(props.sid, true);
                }}
              >
                Accept
              </button>
              <button
                className="adf"
                onClick={() => {
                  props.cb(props.sid, false);
                }}
              >
                Reject
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
const Srch = (props) => {
  let history = useHistory();
  function handleClick() {
    props.setUser(props.uid);
    history.push("/view/"+props.uid);
  }
  return (
    <span
      className="sdt"
      style={{
        color: "white",
        fontSize: "1.4rem",
        padding: "1rem",
        cursor: "pointer",
        width: "100%",
      }}
      onClick={handleClick}
    >
      {props.dta}
    </span>
  );
};
