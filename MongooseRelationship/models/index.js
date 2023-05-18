const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/RelationshipDemo')
.then(() =>{
    console.log("Connection Made !");
})
.catch(err =>{
    console.log("Error made !");
    console.log(err);
})

const UserSchema = new mongoose.Schema({
    first:String,
    last:String,
    addressess : [{
        _id : {_id: false},
        street: String,
        city  : String,
        state : String,
        country: String 
    }]
})

const User = mongoose.model('User',UserSchema);

const MakeUser = async () =>{
    const u = new User({
        first:"Maxx",
        last:"Dome"
    })
    u.addressess.push({
        street:"street no 2",
        city:"london",
        state:"london",
        country:"U.K"
    })
    const res = await u.save();
}

MakeUser();