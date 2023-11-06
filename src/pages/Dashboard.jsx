import React, {useEffect} from 'react'
import Layout from './Layout'
import Welcome from '../components/Welcome'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { getMe } from '../features/authSlice'
import axios from 'axios'

const Dashboard = () => {

  const navigate = useNavigate()

  useEffect(()=>{
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
    getMe()
    //eslint-disable-next-line react-hooks/exhaustive-deps        

  },[navigate])


  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const {isError} = useSelector((state => state.auth))

  // useEffect(()=>{
  //   dispatch(getMe());
  // },[dispatch])

  // useEffect(()=>{
  //   if(isError){
  //     navigate("/")
  //   }
  // },[isError, navigate])

  return (
    <Layout>
        <Welcome/>
    </Layout>
  )
}

export default Dashboard