import { Link , useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
const Login = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(auth){
            navigate('/')
        }
    })
    const handleLogin= async()=>{
        console.log(email,password)
        let result = await fetch("http://localhost:8000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json()
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/')
        }else{
            alert("User not found")
        }
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input className="inputBox" type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className="inputBox" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="loginbtn" onClick={handleLogin}>Login</button>
            <h5 className="loginh5">Not Registered yet?<Link to="/signup"> Sign up here</Link></h5>
        </div>
    )
}
export default Login