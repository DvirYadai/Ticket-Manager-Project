import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignUp({ setUserLogged }) {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { register, handleSubmit } = useForm();

  const submitForm = async ({ username, email, password }) => {
    try {
      const res = await axios.post("/api/user/signup", {
        username,
        email,
        password,
      });
      if (res.status === 201) {
        setUserLogged(res.data.username);
      }
    } catch (error) {
      if (error.response.data.errors.username !== "") {
        setUsernameError(error.response.data.errors.username);
      } else {
        setUsernameError("");
      }
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
        <h2>Sign up</h2>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" {...register("username")} />
        <div className="username error">
          {usernameError !== "" ? usernameError : ""}
        </div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" {...register("email")} />
        <div className="email error">{emailError !== "" ? emailError : ""}</div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" {...register("password")} />
        <div className="password error">
          {passwordError !== "" ? passwordError : ""}
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
}
