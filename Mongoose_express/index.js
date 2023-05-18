const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const Farm = require('./models/farm');

//using session and flash(used to show message and disappear as soon as user refresh its page)
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({secret:'dccdcdcdc',resave:false,saveUninitialized:false}));
app.use(flash());

const methedOverride = require('method-override')
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

app.get('/products',async (req,res) =>{
   const {category} = req.query;
   if(category){
    const products = await Product.find({category});
    res.render('products/index',{products,category});
   }
   else{
    const products = await Product.find({});
    res.render('products/index',{products,category:'All'});
   }
});

app.get('/products/new',async (req,res) =>{
    res.render('products/new',{Categories});
});

app.get('/products/:id', async (req,res) =>{
    const {id} = req.params;
    const pro = await Product.findById(id).populate('farm','name');
    console.log(pro);
    res.render('products/app',{pro})
})

app.get('/products/:id/edit', async (req,res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product,Categories})
})

app.delete('/farm/:id', async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);

    res.redirect('/farm');
})

////////////farm///////////

app.get('/farm',async (req,res) =>{
    const farms = await Farm.find({});
    res.render('./farm/index',{farms,messages: req.flash('success')})
});

app.get('/farm/new', (req,res) =>{
    res.render('farm/new');
});

app.get('/farm/:id', async (req,res) =>{
    const farm = await Farm.findById(req.params.id).populate('products')
    res.render('farm/show',{farm})
});

app.get('/farm/:id/products/new', async (req,res) =>{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new',{Categories,farm})
})

app.post('/farm',async (req,res) => {
    const farm = new Farm(req.body);
    req.flash('success','You have succesfully made a farm!')
    await farm.save();
    res.redirect('farm');
})

app.post('/farm/:id/products', async (req,res) =>{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const {name,price,category} = req.body;
    const product = new Product({name,price,category});
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farm/${id}`)
});
////////////////////////////

app.post('/products',async (req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.put('/products/:id',async (req,res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req,res) =>{
    const {id} = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(30000, ()=>{
    console.log("listening on port 30000")
});
