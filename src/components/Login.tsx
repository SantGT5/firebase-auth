import React from "react";
import { Link } from "react-router-dom";
import { useAuth, LoginIn } from "../firebase/firebase-config";

export const Login = () => {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const currentUser: any = useAuth()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await LoginIn(loginEmail, loginPassword)
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Link to="/">Register</Link>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button type="submit"> Login</button>
        <p>Current user logged is: { currentUser?.email }</p>
      </div>
    </form>
  );
};
