import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Login({ setUserLogged, userLogged }) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const submitForm = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (res.status === 200) {
        // setUserLogged(res.data.user);
        history.push({
          pathname: "/main",
          state: { user: res.data.user },
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.errors.email !== "") {
        setEmailError(error.response.data.errors.email);
      } else {
        setEmailError("");
      }
      if (error.response.data.errors.password !== "") {
        setPasswordError(error.response.data.errors.password);
      } else {
        setPasswordError("");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" {...register("email")} />
        <div className="email error">{emailError !== "" ? emailError : ""}</div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" {...register("password")} />
        <div className="password error">
          {passwordError !== "" ? passwordError : ""}
        </div>
        <button>login</button>
        <p>
          Don't have a user? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}
