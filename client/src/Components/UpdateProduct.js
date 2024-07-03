import React, { useEffect } from "react";
import { useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
const UpdateProduct = () =>{
    const [model,setModel] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [brand,setBrand] = useState("");
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
        let result = await fetch(`http://localhost:8000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setModel(result.model)
        setPrice(result.price)
        setCategory(result.category)
        setBrand(result.brand)
    }

    const updateProduct=async()=>{
        console.log(model,price,category,brand)
        let result = await fetch(`http://localhost:8000/product/${params.id}`,{
        method:'put',
        body: JSON.stringify({model,price,category,brand}),
        headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        })
        result = await result.json()
        navigate('/')
        console.log(result)
    }
    return(
        <div className="addproduct">
            <h1>UPDATE PRODUCT</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Model" value={model} onChange={(e)=>setModel(e.target.value)}/>
            <input className="inputBox" type="number" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <input className="inputBox" type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <input className="inputBox" type="text" placeholder="Enter Product Brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
            <button onClick={updateProduct} className="addbtn">Add Product</button>
        </div>
    )
}
export default UpdateProduct;