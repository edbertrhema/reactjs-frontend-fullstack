import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}products/${id}`,{
        
          name: name,
          price: price,
        
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('myToken')}`
        },       

      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(()=>{
    const getProductById = async () =>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('myToken')}`
          }
        })
        setName(response.data.name)
        setPrice(response.data.price)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }        
      }
    }
    getProductById()
  }, [id])

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Products</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form className="box" onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>

              <div className="field mt-5">
                <div className="control">
                  <button className="button is-success " type="submit">
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
