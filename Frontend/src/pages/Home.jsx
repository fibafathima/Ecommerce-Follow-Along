// import React from 'react'
// import productData from './data.json'
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import axios from "axios";
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(true);
  let [productData, setProductData]=useState([])

  let email=useSelector((state)=>state.user.email)

  useEffect(()=>{
    fetch("http://localhost:8080/product").then((res)=>{
      return res.json();
    }).then((res)=>{
      console.log(res)
      setProductData(res.data)
      setLoading(false);
    }).catch((err)=>{
      console.log(err)
      setLoading(false); 
    })
  },[])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      let response = await axios.delete(
        `http://localhost:8080/product/delete/${id}`
      );
      console.log(response.data.message);
      const filtered_data = productData.filter((e) => e._id !== id);
      setProductData(filtered_data);
      setTimeout(() => {
        navigate("/");
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar/>
      {/* <h1>Email: {email}</h1> */}
      <div className="container ml-20 mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productData?.map((product, index) => (
          <Card key={index} product={product} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home