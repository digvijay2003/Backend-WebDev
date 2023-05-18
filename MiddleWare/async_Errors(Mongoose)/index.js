const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methedOverride = require('method-override')
const AppError = require('./AppError');

mongoose.connect('mongodb://127.0.0.1:27017/farmstand2')
.then(() =>{
    console.log("Connection  Open");
})
.catch(err =>{
    console.log("error made !");
    console.log(err);
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(methedOverride('_method'))

const Categories = ['fruit','vegetable','dairy'];

function wrapAsync(fn){
    return function (req,res,next){
        fn(req,res,next).catch(e => next(e));
    }
}

app.get('/products',wrapAsync(async (req,res) =>{
        const {category} = req.query;
        if(category){
         const products = await Product.find({category});
         res.render('products/index',{products,category});
        }
        else{
         const products = await Product.find({});
         res.render('products/index',{products,category:'All'});
        }
}));

app.get('/products/new', wrapAsync((req,res) =>{
    throw new AppError('Not Allowed',401);
    res.render('products/new',{Categories});
}));

app.get('/products/:id',wrapAsync( async (req,res,next) =>{
    const {id} = req.params;
    const pro = await Product.findById(id);
    if(!pro){
        throw next( new AppError('Product Not Found',404))
    }
    res.render('products/app',{pro})
}))

app.get('/products/:id/edit',wrapAsync( async (req,res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        throw new AppError('Product Not Found',404)
    } else{
    res.render('products/edit',{product,Categories})
    }
}))

app.post('/products',wrapAsync(async (req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))

app.put('/products/:id',wrapAsync(async (req,res,next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect(`/products/${product._id}`)
}))

app.delete('/products/:id', wrapAsync(async (req,res) =>{
    const {id} = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
}))

const handleCastError = err =>{
    console.dir(err.name);
    return new AppError(`Product ID is InValid: ${err.message}`,404)
}

const handleValidationError = err =>{
    console.dir(err.name);
    return new AppError(`Validation Failed.....${err.message}`,400)
}

app.use((err,req,res,next)  =>{
    console.log(err.name);
    if(err.name === 'CastError') err = handleCastError(err)
    if(err.name === 'ValidationError') err = handleValidationError(err)
    next(err);
})

app.use((err,req,res,next)  =>{
    const {status = 500, message = 'something went wrong !'} = err;
    res.status(status).send(message);
})

app.listen(30000, ()=>{
    console.log("listening on port 3000")
});
