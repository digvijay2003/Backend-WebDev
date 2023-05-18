const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmstand')
.then(() =>{
    console.log("Connection  Open");
})
.catch(err =>{
    console.log("error made !");
    console.log(err);
})

const seedProducts = [
    {
    name:'mango',
    price:100,
    category:'fruit'
    },
    {
    name:'carrot',
    price:50,
    category:'vegetable'
    },
    {
    name:'apple',
    price:150,
    category:'fruit'
    }
]

Product.insertMany(seedProducts)
.then(d =>{
    console.log(d)
})
.catch(e =>{
    console.log(e)
})