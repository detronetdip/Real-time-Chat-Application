import { useEffect, useRef, useState } from "react";
import Message from "../Message/Message";
import Loader from "../loader/Defaultloader2";
import axios from "axios";
import "./chat.css";
import newId from "idrand";
import "boxicons";
import ChatTop from "../chatTop/ChatTop";
import { format } from "timeago.js";
export default function Chat(props) {
  const messagesEndRef = useRef(null);
  var [sg, setsg] = useState(null);
  var c = Date.now();
  useEffect(() => {
    axios
      .post("/api/get/message", {
        sender: props.uid,
        receiver: props.chatId,
      })
      .then((e) => {
        setsg(e.data);
      });
    props.sct?.on("k", (e) => {
      setsg((o) => {
        return [...o, e];
      });
    });
    props.sct?.on("newmessage", (e) => {
      if (e.sender === props.chatId) {
        setsg((o) => {
          return [...o, e];
        });
      }
    });
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [sg]);
  useEffect(() => {
    var fld = document.getElementById("textfield");
    var bt = document.getElementById("btn");
    fld.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        bt.click();
      }
    });
  }, []);
  const [newMessage, setNewmessage] = useState("");
  const update = (e) => {
    setNewmessage(e.target.value);
  };
  const handelSubmit = (event) => {
    const msg = {
      createdAt: Date.now(),
      sender: props.uid,
      receiver: props.chatId,
      sn: props.uname,
      text: newMessage,
    };
    props.socket(msg);
    setsg((e) => {
      return [...e, msg];
    });
    axios.post("/api/message", {
      sender: props.uid,
      receiver: props.chatId,
      text: newMessage,
    });
    setNewmessage("");
  };
  return (
    <>
      <div className="title2">
        <ChatTop name={props.chat} reference={props.refrence} />
      </div>
      <div className="chatwrapper">
        {sg !== null ? (
          sg.map((e) => (
            <Message
              class={"msg " + (e.sender == props.uid ? "my" : "nmy")}
              sender={e.sn}
              text={e.text}
              time={format(e.createdAt)}
              key={newId()}
            />
          ))
        ) : (
          <Loader />
        )}
        <span ref={messagesEndRef}></span>
      </div>
      <div className="textfield">
        <input
          type="text"
          placeholder="Type message.."
          id="textfield"
          value={newMessage}
          onInput={update}
        />
        <button onClick={handelSubmit} id="btn">
          <box-icon name="send" color="white"></box-icon>
        </button>
      </div>
    </>
  );
}
