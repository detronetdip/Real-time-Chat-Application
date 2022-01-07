import ChatHead from "../../components/ChatHead/ChatHead";
import "./chatpage.css";
import newId from "idrand";
import axios from "axios";
import DefaultLoader from "../../components/loader/Defaultloader2";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Chat from "../../components/chat/Chat";
export default function Chatpage(props) {
  const [chat, setChat] = useState(false);
  const [chatid, setChatid] = useState(null);
  const [chatHeads, setChatheads] = useState([]);
  const [fetching, setFetching] = useState(null);
  const [socket, setSocket] = useState(null);
  const ref = useRef(null);
  let r;
  useEffect(() => {
    setSocket(io());
  }, []);
  useEffect(() => {
    socket?.on("connect", () => {
      sentD({
        sid: socket.id,
        uid: props.user.uid,
      });
    });
  }, [socket]);
  useEffect((e) => {
    axios.get("/api/friendsList", { withCredentials: true }).then((e) => {
      setChatheads(e.data);
      setFetching(1);
    });
  }, []);
  const sentD = (info) => {
    socket.emit("info", info);
  };
  function sentSocket(text) {
    socket.emit("msg", text);
  }
  function check(e) {
    if (window.innerWidth <= 850) {
      ref.current.style.transform = "translate(-100%)";
    }
    setChat(e);
  }
  return (
    <>
      <section className="main">
        <div className="left" ref={ref} style={{transition:"0.2s"}}>
          {fetching != null ? (
            <div className="chatHeadWrapper">
              {chatHeads !== null
                ? chatHeads.map((e) => (
                    <div onClick={() => check(e.name)}>
                      <ChatHead
                        name={e.name}
                        id={e._id}
                        setId={setChatid}
                        key={newId()}
                      />
                    </div>
                  ))
                : ""}
            </div>
          ) : (
            <DefaultLoader />
          )}
        </div>
        <div className="right">
          {chat ? (
            <>
              <Chat
                refrence={ref}
                chat={chat}
                chatId={chatid}
                key={chatid}
                uid={props.user.uid}
                uname={props.user.uname}
                socket={sentSocket}
                sct={socket}
              />
            </>
          ) : (
            <section className="nochat"> Select a chat </section>
          )}
        </div>
      </section>
    </>
  );
}
