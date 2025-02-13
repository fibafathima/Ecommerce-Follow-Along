
const express= require('express')
const multer=require('multer')
const path=require('path');
const { productModel } = require('../model/product.model');
let productRouter=express.Router();

productRouter.get('/',async(req,res)=>{
    try{
        const products = await productModel.find()
        res.send({"message":"Successfully retrived the data from the database",data:products})

    }catch(error){
        res.send({"Error-message":error})

    }
})
productRouter.get('/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const products = await productModel.findById(id);

        res.send({"message":"Successfully retrived the data from the database",data:products})

    }catch(error){
        res.status(500).send({"Error-message": error});


    }
})

productRouter.delete("/product/:id",async(req,res)=>{

    let id =req.params.id

    try{
        let deletedProduct = await productModel.findByIdAndDelete(id);
        if(!deletedProduct){
            res.status(404).json({"message":"Product Not Found"})
        }
    }catch(error){
        res.status(500).json({"error":error.message})
    }
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '././uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+ path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

productRouter.post('/create',upload.array('productImage', 12),async(req, res)=>{
    try {
        const { productName, productDescription, productPrice } = req.body;
        const imgPath=req.files.map((file)=>{
            return(`/uploads/${file.filename}`)
        })
        const newProduct=new productModel({
            productName, 
            productDescription, 
            productPrice,
            productImages:imgPath
        })

        await newProduct.save();
        res.json({"message":"Hurray! Product added to the database successfully", "product":newProduct})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
})

module.exports={productRouter}
