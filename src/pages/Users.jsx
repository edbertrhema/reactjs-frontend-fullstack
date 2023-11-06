import React, {useEffect} from 'react'
import Layout from './Layout'
import Userlist from '../components/Userlist'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { getMe } from '../features/authSlice'
import axios from 'axios'
const Users = () => {


  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const {isError, user} = useSelector((state => state.auth))

  // useEffect(()=>{
  //   dispatch(getMe());
  // },[dispatch])

  // useEffect(()=>{
  //   if(isError){
  //     navigate("/")
  //   }
  //   if(user && user.role !== "admin"){
  //     navigate("/dashboard")      
  //   }
  // },[isError, user, navigate])

  const navigate = useNavigate()

  useEffect(()=>{
    getMe()
  })

  const getMe = async() =>{
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}me`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('myToken')}`
          }
        })
        // console.log(localStorage.getItem('myToken'))
        // if(localStorage.getItem('myToken') === null){navigate("/")}
      } catch (error) {
        if(error.response ){
          navigate("/")
        }else{
          navigate("/")
        }
      }
  }  

  return (
    <Layout>
        <Userlist/>
    </Layout>

    )
}

export default Users