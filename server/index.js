import express from "express";
import cors from 'cors';
import  jwt  from "jsonwebtoken";
import User from './db/user.js'
import Product from './db/Product.js'
import './db/config.js'

const Jwtkey = 'e-comm'
 const app = express()
 app.use(cors())
 app.use(express.json())
 app.post('/signup',async(req,resp)=>{
    let user =new User(req.body)
    let result = await user.save()
    result =result.toObject();
    delete result.password
    jwt.sign({result},Jwtkey,{expiresIn:'2h'},(error,token)=>{
      if(error){
         resp.send("Something went Wrong")
      }
      resp.send({result,auth:token})
   })
 })

 app.post('/login',async (req,resp)=>{
   if(req.body.email && req.body.password){
      let user = await User.findOne(req.body).select("-password")
      if(user){
         jwt.sign({user},Jwtkey,{expiresIn:'2h'},(error,token)=>{
            if(error){
               resp.send("Something went Wrong")
            }
            resp.send({user,auth:token})
         })
      }else{
         resp.send({result:"user not Found"})
      }
   }
   else{
    resp.send({result:"user not found in"})  
   }
 })

 app.post('/add-product',verifyToken, async(req,resp)=>{
   let product = new Product(req.body);
   let result = await product.save();
   resp.send(result)
 })

 app.get('/products',verifyToken,async(req,resp)=>{
   let product= await Product.find()
   if(product.length>0){
      resp.send(product)
   }else{
      resp.send({result:"no Product found"})
   }
 })

 app.delete("/product/:id",verifyToken,async(req,resp)=>{
   let result = await Product.deleteOne({_id:req.params.id})
   resp.send(result)
 })

 app.get('/product/:id',verifyToken,async(req,resp)=>{
   let result = await Product.findOne({_id:req.params.id})
   if(result){
      resp.send(result)
   }else{
      resp.send({result:"No record found"})
   }
 })

 app.put('/product/:id',verifyToken,async(req,resp)=>{
   let result = await Product.updateOne(
      {_id:req.params.id},
      {
         $set:req.body
      }
)
resp.send(result)
})

app.get('/search/:key',verifyToken,async(req,resp)=>{
   let result = await Product.find({
      "$or":[
         {model:{$regex: req.params.key}},
         {category:{$regex: req.params.key}},
         {brand:{$regex: req.params.key}}
      ]
   });
   if(result){
      resp.send(result)
   }else{
      resp.send({result:"No record Found"})
   }
 })

function verifyToken(req, resp ,next){
   let token = req.headers['authorization'];
   if(token){
      token = token.split(" ")[1];
      jwt.verify(token,Jwtkey,(error,token)=>{
         if(error){
            resp.status(401).send({result:"Please Provide valid token"})
         }else{
            next()
         }
      })
   }else{
      resp.status(403).send({result:"Please add token with header"})
   }
}

 app.listen(8000,()=>{console.log("Server is running on PORT 8000")})
