const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/person')
.then(() =>{
    console.log("Connection made");
})
.catch(err =>{
    console.log("error made !");
    console.log(err);
})

const personSchema = new mongoose.Schema({
    first:String,
    last:String
});

personSchema.virtual('fullname').get(function (){
    return `${this.first} ${this.last}`
});

const Person = new mongoose.model('Person',personSchema);