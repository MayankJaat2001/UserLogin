import React from "react";
import { useState } from "react";
const AddProduct = () =>{
    const [model,setModel] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [brand,setBrand] = useState("");
    const [error,setError] = useState(false)

    const addProduct=async()=>{
        if(!model || !price || !category || !brand){
            setError(true)
            return false
        }
        let auth= JSON.parse(localStorage.getItem("user"))
        let userId = auth._id
        let product = await fetch('http://localhost:8000/add-product',{
            method:'post',
            body:JSON.stringify({model,price,category,userId,brand}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        product=await product.json()
        console.log(product)
        alert("Product added Successfully!")
    }
    return(
        <div className="addproduct">
            <h1>ADD PRODUCT</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Model" value={model} onChange={(e)=>setModel(e.target.value)}/>
            {error && !model && <span className="error-msg">Enter valid model!</span>}
            <input className="inputBox" type="number" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {error && !price && <span className="error-msg">Enter valid price!</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            {error && !category && <span className="error-msg">Enter valid category!</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
            {error && !brand && <span className="error-msg">Enter valid brand!</span>}
            <button onClick={addProduct} className="addbtn">Add Product</button>
        </div>
    )
}
export default AddProduct;