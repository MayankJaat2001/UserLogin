import React,{useEffect, useState} from 'react'
import { useNavigate , Link } from 'react-router-dom'
const Signup = ()=>{
    const [name,SetName]=useState("")
    const [email,SetEmail]=useState("")
    const [password,SetPassword]=useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })

    const collectData=async()=>{
        console.log(name,email,password)
        let result = await fetch('http://localhost:8000/signup',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        })
    result=await result.json()
        console.log(result)
        localStorage.setItem('user',JSON.stringify(result.result))
        localStorage.setItem('token',JSON.stringify(result.auth))
        if(result){
            navigate('/')
        }
    }
    return(
        <div className="signup">
            <h1>Registration</h1>
            <input className="inputBox" type="text" value={name} onChange={(e)=>SetName(e.target.value)} placeholder="Enter Name"/>
            <input className="inputBox" type="Email" value={email} onChange={(e)=>SetEmail(e.target.value)} placeholder="Enter Email"/>
            <input className="inputBox" type="Password" value={password} onChange={(e)=>SetPassword(e.target.value)} placeholder="Enter Password"/>
            <button className="signupbtn" onClick={collectData}>Sign Up</button>
            <h5 className='loginh5'>Already Registered? <Link to='/login'>Login</Link></h5>
        </div>
    )
}
export default Signup;