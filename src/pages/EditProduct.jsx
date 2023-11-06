import React,{ useEffect} from 'react'
import Layout from './Layout'
import FormEditProduct from '../components/FormEditProduct'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { getMe } from '../features/authSlice'
import axios from 'axios'

const EditProduct = () => {

  // const dispatch = useDispatch()
  const navigate = useNavigate()
  // const {isError} = useSelector((state => state.auth))

  // useEffect(()=>{
  //   dispatch(getMe());
  // },[dispatch])

  // useEffect(()=>{
  //   if(isError){
  //     navigate("/")
  //   }
  // },[isError, navigate])

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
        <FormEditProduct/>
    </Layout>
  )
}

export default EditProduct