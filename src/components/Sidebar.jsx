import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { LogOut, reset } from "../features/authSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Sidebar = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);
  const [user, setUser] = useState("")


  useEffect(()=>{
    try {
      const decoded = jwtDecode(localStorage.getItem('myToken'))
      setUser(decoded)
    } catch (error) {
      if(error.response){
        navigate("/")
      }       
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps        
  },[])

  const logout = async() => {
    // dispatch(LogOut());
    // dispatch(reset());
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
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>
              <IoPricetag /> Products
            </NavLink>
          </li>
        </ul>

        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
