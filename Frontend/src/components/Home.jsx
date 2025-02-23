import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { useEffect, useState } from "react";

function Home() {
    const navigate = useNavigate();

    let [productData,setProductData]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/product").then((res)=>{
            return res.json();
        }).then((res)=>{
            console.log(res)
        setProductData(res.data)
        console.log(res.data) 

        }).catch((err)=>{
            console.log(err)
        })
    })


    const handleDelete=async(id)=> {
        try {
            let response=await axios.delete(`http://localhost:8080/product/delete/${id}`)
            console.log(response.data.message)
            const filteredData=productData.filter((e) =>e._id!=id)
            setProductData(filteredData)
        } catch (error) {
            console.log(error)
        }
    }

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "150px",
        boxSizing: "border-box",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
    };

    const cartStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "30px",
        padding: "40px",
        backgroundColor: "#f1f1f1",
    };

    return (
        <div>
            <div style={containerStyle}>
                <h1>Welcome to E-Commerce</h1>
            </div>
            <div style={cartStyle}>
                {productData?.map((product) => (
                    <Cart key={product.id} product={product} onDelete={() => handleDelete(product._id)}></Cart>

                ))}
            </div>
        </div>
    );
}

export default Home;