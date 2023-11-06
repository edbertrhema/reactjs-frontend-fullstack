import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Userlist = () => {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{

        getUser()
        
        //eslint-disable-next-line react-hooks/exhaustive-deps                
    },[])

    const getUser = async() =>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}users`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('myToken')}`
                }
            })
            setUsers(response.data)            
        } catch (error) {
            if(error.response){
                navigate("/")
              }                          
        }
    }

    const deleteUser = async(userId) =>{
        await axios.delete(`${process.env.REACT_APP_API_URL}users/${userId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('myToken')}`
            }
        })
        getUser();
    }

    return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>List of Users</h2>
        <Link to="/users/add" className='button is-primary mb-2'>Add New</Link>
    <table className='table is-striped is-fullwidth'>
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Row</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user,index) => (
            <tr key = {user.uuid}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <Link to ={`/users/edit/${user.uuid}`} className='button is-small is-info'>Edit</Link>
                    <button onClick={()=> deleteUser(user.uuid)} className='button is-small is-danger'>Delete</button>
                </td>
            </tr>
            ))}

        </tbody>
    </table>
    </div>
  )
}

export default Userlist