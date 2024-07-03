import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = async () => {
        let result = await fetch("http://localhost:8000/products",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result)
    }
    const deleteProduct=async(id)=>{
        let result = await fetch(`http://localhost:8000/product/${id}`,{
            method:'delete',
            
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }
        );
        result = await result.json()
        if(result){
            alert("record deleted")
            getProducts();
        }
    }

    const searchHandle=async(e)=>{
        const key = e.target.value;
        if(key){

            let result = await fetch(`http://localhost:8000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }else{
            getProducts()
        }
    }
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input className="search-product" type="text" placeholder="Search Products" onChange={searchHandle}/>
            <ul>
                <li>S. No.</li>
                <li>Model</li>
                <li>Price</li>
                <li>Category</li>
                <li>Brand</li>
                <li>Operations</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.model}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.brand}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={`/update/${item._id}`}>Update</Link></li>
                    </ul>
                )
                :
                <h1>No Record Found</h1>
            }
        </div>
    )
}
export default Products