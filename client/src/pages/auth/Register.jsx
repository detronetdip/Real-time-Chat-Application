import "./auth.css";
import { useState } from "react";
import swal from "@sweetalert/with-react";
import axios from "axios";
import {useHistory} from 'react-router-dom'
export default function Register() {
  let history=useHistory();
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Error, setError] = useState({
    nameErr: false,
    emailErr: false,
    passwordErr: false,
    isLoader: false,
  });
  const update = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setstate((old) => {
      return { ...old, [name]: value };
    });
  };
  const handelRegister = (e) => {
    e.preventDefault();
    setError((e) => {
      return { ...e, isLoader: true };
    });
    if (state.name === "") {
      setError((e) => {
        return { ...e, nameErr: true };
      });
      setError((e) => {
        return { ...e, isLoader: false };
      });
    } else {
      setError((e) => {
        return { ...e, nameErr: false };
      });
    }
    if (state.password === "") {
      setError((e) => {
        return { ...e, passwordErr: true };
      });
      setError((e) => {
        return { ...e, isLoader: false };
      });
    } else {
      setError((e) => {
        return { ...e, passwordErr: false };
      });
    }
    if (state.email === "") {
      setError((e) => {
        return { ...e, emailErr: true };
      });
      setError((e) => {
        return { ...e, isLoader: false };
      });
    } else {
      setError((e) => {
        return { ...e, emailErr: false };
      });
    }
    if (state.email != "" && state.password != "" && state.name != "") {
      axios
        .post("/api/register", {
          name: state.name,
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          swal(res.data.msg, "", res.data.type).then(e=>{
            history.push('/auth')
          });
        });
    }
  };
  return (
    <>
      <form action="" method="POST">
        <h4>Register</h4>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          onInput={update}
          value={state.name}
        />
        {Error.nameErr ? (
          <div
            className="errr"
            style={{ fontSize: "1.2rem", color: "red", fontWeight: "300" }}
          >
            Enter Name
          </div>
        ) : (
          ""
        )}
        <input
          type="email"
          placeholder="Email id"
          name="email"
          onInput={update}
          value={state.email}
        />
        {Error.emailErr ? (
          <div
            className="errr"
            style={{ fontSize: "1.2rem", color: "red", fontWeight: "300" }}
          >
            Enter Email
          </div>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onInput={update}
          value={state.password}
        />
        {Error.passwordErr ? (
          <div
            className="errr"
            style={{ fontSize: "1.2rem", color: "red", fontWeight: "300" }}
          >
            Enter Password
          </div>
        ) : (
          ""
        )}
        {Error.isLoader ? (
          <button disabled>
            <box-icon color="white" name="loader" animation="spin"></box-icon>
          </button>
        ) : (
          <button onClick={handelRegister}>Register</button>
        )}
      </form>
    </>
  );
}
