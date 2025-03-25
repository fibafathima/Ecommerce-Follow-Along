import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Singleproduct = () => {
    const [product,setProduct] = useState({})
    const [qty,setQty] = useState()
    let {id} = useParams();

    const fetchData=async()=>{
        try {
            let res = await fetch(`https://ecommerce-follow-along-pjqp.onrender.com/product/${id}`)
            res = await res.json()
            console.log(res)
            
        } catch (error) {
            console.log(error)
            
        }
       
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='cart'>
      <img  alt={product.productName} />
      <h3>Product Name: {product.productName}</h3>
      <h4>Price : {product.productPrice}</h4>
      <div style = {{display:"flex"}}>
        <button>+</button>
        <h3>{qty}</h3>
        <button>-</button>
      </div>
      <button>Add to Cart</button>

    </div>
  )
}

export default Singleproduct
