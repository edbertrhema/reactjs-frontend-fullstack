import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditUser from '../components/FormEditUser'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { getMe } from '../features/authSlice'
import axios from 'axios'

const EditUser = () => {

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
        <FormEditUser/>
    </Layout>
    )
}

export default EditUser