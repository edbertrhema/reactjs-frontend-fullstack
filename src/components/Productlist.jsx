import React, {useState, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'

const Productlist = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps        
      },[])

    
    const getProducts = async() =>{
            
        
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}products`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('myToken')}`
                    }
                })
                setProducts(response.data);            
                
            } catch (error) {
                if(error.response){
                    navigate("/")
                  }                
            }
    }

    const deleteProduct = async(productId) =>{

        try {

            await axios.delete(`${process.env.REACT_APP_API_URL}products/${productId}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('myToken')}`
                }            
            })
            getProducts();

        } catch (error) {
            if(error.response){
                navigate("/")
              }   
        }        
    }


  return (
    <div>
        <h1 className='title'>Products</h1>
        <h2 className='subtitle'>List of Products</h2>
        <Link to="/products/add" className='button is-primary mb-2'>Add New</Link>
    <table className='table is-striped is-fullwidth'>
        <thead>
            <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Created By</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (

            <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.user.name}</td>
                <td>
                    <Link to ={`/products/edit/${product.uuid}`} className='button is-small is-info'>Edit</Link>
                    <button onClick={()=> deleteProduct(product.uuid)} className='button is-small is-danger'>Delete</button>
                </td>
            </tr>

            ))}
        </tbody>
    </table>
    </div>    
  )
}


export default Productlist