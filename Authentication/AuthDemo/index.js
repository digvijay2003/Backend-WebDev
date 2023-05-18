const { urlencoded } = require('express');
const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://127.0.0.1:27017/AuthDemo')
.then(() =>{
    console.log("Connection made");
})
.catch(err =>{
    console.log("error made !");
    console.log(err);
})

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:true})); 
app.use(session({secret:'notagoodsecreat'}));

const requireLogin = (req,rres,next) =>{
    if(!req.session.user_id){
        return rres.redirect('/login');
    }
    next();
}

app.get('/', async(req,res) =>{
    res.send('this is home page')
});

app.get('/login', async(req,res) =>{
    res.render('login')
});

app.get('/registor', async(req,res) =>{
    res.render('registor')
});

app.get('/secrets', requireLogin, (req,res) =>{
    res.render('secret')
});

app.post('/logout', (req,res) =>{
    // req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
});

app.post('/registor', async(req,res) =>{
    const {password,username} = req.body;
    const user = new User({username,password});
    req.session.user_id = user._id;
    await user.save();
    res.redirect('/')
});

app.post('/login', async(req,res) =>{
    const {username,password} = req.body;
    const foundUser = await User.findAndValidate(username,password);
    if (foundUser){
        // res.send("you successfully logged in");
        req.session.user_id = user._id;
        res.redirect('/secrets')
    } else{
        res.redirect('/login');
    }
});

app.listen(3000, () =>{
    console.log('Listening on Port 3000');
})