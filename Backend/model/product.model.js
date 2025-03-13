
const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true,
        min: 50,
    },
    productPrice:{
        type:String,
        required: true
    },
    productImage:{
        type:[String],
        required: true,
        default:"https://m.media-amazon.com/images/I/41+AJQZxeYL._AC_UY1000_.jpg"
    }
})

const productModel=mongoose.model("productcollections", productSchema)

module.exports={
    productModel
}
