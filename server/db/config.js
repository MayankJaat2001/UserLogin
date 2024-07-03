import mongoose from "mongoose";
try{
    mongoose.connect("mongodb+srv://e-comm:e-comm12@products.kox7w7q.mongodb.net/?retryWrites=true&w=majority&appName=products")
    console.log("Database Connected Successfully")
}catch(error){
    console.log("Not connected"+error)
} 
