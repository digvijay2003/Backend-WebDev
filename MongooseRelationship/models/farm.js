const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/RelationshipDemo')
.then(() =>{
    console.log("Connection Made !");
})
.catch(err =>{
    console.log("Error made !");
    console.log(err);
})

const ProductSchema = new Schema({
    name:String,
    price:Number,
    season:{
        type:String,
        enum:['Spring','Fall','Winter','Summer']
    }
})

const farmSchema = new Schema({
    name:String,
    city:String,
    products: [{type: Schema.Types.ObjectId, ref:'Product'}]
})

const Product = mongoose.model('Product',ProductSchema);
const farm = mongoose.model('farm',farmSchema);

/*Product.insertMany([
    {name:'apple',price:120,season:'Winter'},
    {name:'banana',price:100,season:'Spring'},
    {name:'watermelon',price:60,season:'Summer'}
])*/

/*const makeFarm = async () =>{
    const Farm = new farm({name:'Digu farms',city:'New York'});
    const apple = await Product.findOne({name:'apple'})
    Farm.products.push(apple)
    await Farm.save();
    console.log(Farm);
}
makeFarm();*/

/*const makeFarm = async () =>{
    const Farm = await farm.findOne({name:'Digu farms'});
    const apple = await Product.findOne({name:'apple'})
    Farm.products.push(apple)
    await Farm.save();
    console.log(Farm);
}
makeFarm();*/

farm.findOne({name:'Digu farms'})
.populate('products')
.then(farm => console.log(farm))