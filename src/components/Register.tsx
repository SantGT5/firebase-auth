import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router";
import { SignUp } from "../firebase/firebase-config";

export const Register = () => {
  const navigate = useNavigate()
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  const register = async () => {
    try {
      await SignUp(registerEmail, registerPassword);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const loggedInUser = JSON.parse(storedUser || '""');
  
    if(loggedInUser.apiKey){
      navigate("/home")
    }
  })

  return (
    <div>
      <Link to="/login">Login</Link>

      <h3> Register User </h3>
      <input
        placeholder="Email..."
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        placeholder="Password..."
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />

      <button onClick={register}> Create User</button>
    </div>
  );
};
