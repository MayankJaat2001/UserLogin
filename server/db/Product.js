import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    model:String,
    price:Number,
    category:String,
    userId:String,
    brand:String
})

export default mongoose.model("products",productSchema)