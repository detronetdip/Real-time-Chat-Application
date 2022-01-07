import "./view.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Defaultloader from "../../components/loader/Defaultloader2";
import { useParams } from "react-router-dom";
function View(props) {
  const { uid } = useParams();
  const [state, setState] = useState(null);
  function refresh() {
    setState(null);
    axios
      .post(
        "/api/view",
        {
          uid: uid,
        },
        { withCredentials: true }
      )
      .then((e) => {
        setState(e.data);
      });
  }
  useEffect(() => {
    refresh();
  }, []);
  const sendRequest = () => {
    axios
      .put(
        "/api/friendRequest",
        {
          to: uid,
        },
        { withCredentials: true }
      )
      .then((e) => {
        refresh();
      });
  };
  const unFriend = () => {
    axios
      .put(
        "/api/unfriend",
        {
          to: uid,
        },
        { withCredentials: true }
      )
      .then((e) => {
        refresh();
      });
  };
  const responseRequest = (e) => {
    axios
      .put(
        "/api/respond",
        {
          to: uid,
          accept: e,
        },
        { withCredentials: true }
      )
      .then((e) => {
        refresh();
      });
  };
  return (
    <>
      <section className="myhome">
        <div className="toprow">
          <div className="profile">
            {state == null ? (
              <Defaultloader />
            ) : (
              <div className="wrapperProfile">
                <div className="profileImage">
                  <img src="/images/android-chrome-512x512.png" alt="" />
                </div>
                <div className="desc">
                  <h3>{state.name}</h3>
                  <br />
                  <h4>Friends: {state.friends}</h4>
                  {state.op ? (
                    ""
                  ) : state.if == -1 ? (
                    state.rq != -1 ? (
                      <>
                        <div style={{ display: "flex" }}>
                          <button
                            className="adf"
                            style={{ marginRight: "1rem" }}
                            onClick={() => {
                              responseRequest(true);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="adf"
                            onClick={() => {
                              responseRequest(false);
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </>
                    ) : state.rqd != -1 ? (
                      <button className="adf">Requested</button>
                    ) : (
                      <button className="adf" onClick={sendRequest}>
                        Send Request
                      </button>
                    )
                  ) : (
                    <button className="adf" onClick={unFriend}>
                      Unfriend
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default View;
