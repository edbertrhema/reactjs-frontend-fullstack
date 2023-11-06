import React ,{useEffect}from 'react'
import Layout from './Layout'
import FormAddUser from '../components/FormAddUser'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { getMe } from '../features/authSlice'
import axios from 'axios'


const AddUser = () => {

  // const dispatch = useDispatch()
  const navigate = useNavigate()
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
        <FormAddUser/>
    </Layout>
    )
}

export default AddUser