import React from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import logo from "../admin-logo.png"
// import { useDispatch, useSelector } from "react-redux";
// import { LogOut, reset } from "../features/authSlice";
// import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const Navbar = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {user} = useSelector((state) => state.auth)
    // const [user, setUser] = useState("")


    // useEffect(()=>{
    //     try {
    //         const decoded = jwtDecode(localStorage.getItem('myToken'))
    //         // setUser(decoded.role)
    //       } catch (error) {
    //         if(error.response){
    //           navigate("/")
    //         }       
    //       }
    // })

    const logout = async() =>{
        // dispatch(LogOut());
        // dispatch(reset());
        // navigate("/");
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}logout`,{
              headers:{
                Authorization:`Bearer ${localStorage.getItem('myToken')}`
              }
            })
            localStorage.removeItem('myToken')
            navigate("/")
          } catch (error) {
            if(error.response){
              navigate("/")
            } 
          }
    }   

  return (
    <div>
        <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <NavLink to="/dashboard "className="navbar-item">
            <img 
                src={logo} 
                width="50" 
                height="100"
                alt="logo"
            />
            </NavLink>

            <a href='!#' role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">


            <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                <button onClick={logout} className="button is-light">
                    Logout
                </button>
                </div>
            </div>
            </div>
        </div>
        </nav>        
    </div>
  )
}
