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

const userSchema = new Schema({
    username:String,
    age:Number
})

const tweetSchema = new Schema({
    tweet:String,
    likes:Number,
    user: [{type: Schema.Types.ObjectId, ref:'User'}]
})

const User = mongoose.model('User',userSchema);
const Tweet = mongoose.model('Tweet',tweetSchema);

/*const maketweet = async () =>{
    const user = new User({name:'chicken12',age:56});
    const tweet2 = new Tweet({tweet:'My chickens are healthy af !'});
    tweet2.user = user;
    tweet2.save();
    user.save();
}  

maketweet();*/

const findtweet = async () =>{
    const t = await Tweet.find({}).populate('user','username')
    console.log(t)
}
findtweet();