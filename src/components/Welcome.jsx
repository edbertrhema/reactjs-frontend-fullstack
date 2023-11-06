import React,{useState, useEffect} from "react";
// import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Welcome = () => {
  // const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("")
  // const [token, setToken] = useState("")
  // const [expire, setExpire] = useState("")
  const navigate = useNavigate()
  // const { default: jwt_decode } = require("jwt-decode");

  useEffect(()=>{
    refreshToken()
  })

  const refreshToken = async () =>{
    try {
      // const response = await axios.get('http://localhost:5000/token')
      // setToken(response.data.accessToken)
      // localStorage.setItem('myToken',response.data.accessToken)
      // const decoded = jwtDecode(response.data.accessToken)
      const decoded = jwtDecode(localStorage.getItem('myToken'))

      setName(decoded.name)
      // setExpire(decoded.exp)
    } catch (error) {
      if(error.response){
        navigate("/")
      }
    }
  }


  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{name}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
