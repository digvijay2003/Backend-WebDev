const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopeApp')
.then(() =>{
    console.log("Connection made");
})
.catch(err =>{
    console.log("error made !");
    console.log(err);
})
const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 20
    },
    price:{
        type: Number,
        required: true,
        min : [200,'price must be more than 200']
    },
    categories:{
        type: [String],
        default: false
    },
    qty:{
        online:{
            type:Number,
            default: 0 
        },
        inStore:{
            type:Number,
            default: 0 
        }
    },
});

/*const Bike = new Product({name:"Sand Bike", price:99,categories:['adventure','safety',]});
Bike.save()
.then(data => 
    { console.log("it worked", data)})
.catch(err => 
    { console.log("error",err.errors)})*/

ProductSchema.methods.addcategory = function (newcat) {
    this.categories.push(newcat);
    return this.save();
}

ProductSchema.statics.fireSale = function (){
    return this.updateMany({},{ price:0})
}

const Product = mongoose.model('Product', ProductSchema);

const findProduct = async () =>{
    const foundProduct = await Product.findOne({name:"Mountain Bike"});
    console.log(foundProduct);
    await foundProduct.addcategory('motorcycle');
    console.log(foundProduct);
}    

Product.fireSale().then(res => console.log(res));

findProduct();