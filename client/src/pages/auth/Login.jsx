import "./auth.css";
import { useState } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";
export default function Login(props) {
  const [state, setstate] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState({
    emailErr: false,
    passwordErr: false,
    isLoader: false,
  });
  const update = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setstate((old) => {
      return { ...old, [name]: value };
    });
  };
  const handelLogin = (event) => {
    event.preventDefault();
    setError((e) => {
      return { ...e, isLoader: true };
    });
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
    if (state.email != "" && state.password != "") {
      axios
        .post("/api/validate", {
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          if (res.data.valid == null) {
            swal(res.data.msg, "", "warning");
          } else {
            props.setTest(res.data.valid);
          }
        });
    }
  };
  return (
    <>
      <form action="" method="POST">
        <h4>Login</h4>
        <input
          type="email"
          placeholder="Email id"
          name="email"
          value={state.email}
          onInput={update}
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
          value={state.password}
          onInput={update}
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
          <button onClick={handelLogin}>Login</button>
        )}
      </form>
    </>
  );
}
