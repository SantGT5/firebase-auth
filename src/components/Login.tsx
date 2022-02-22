import React from "react";
import { Link } from "react-router-dom";
import { useAuth, LoginIn } from "../firebase/firebase-config";
import { useNavigate } from "react-router";

export const Login = () => {

  const navigate = useNavigate()
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const currentUser = useAuth()

  React.useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const loggedInUser = JSON.parse(storedUser || '""');
  
    if(loggedInUser.apiKey){
      navigate("/home")
    }
  })

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await LoginIn(loginEmail, loginPassword)

      navigate("/home")
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
