import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Singleproduct = () => {
    let {id} = useParams();

    const fetchData=async()=>{
        try {
            let res = await fetch(`http://localhost:8080/product/${id}`)
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
    <div>
      Singleproduct
    </div>
  )
}

export default Singleproduct
