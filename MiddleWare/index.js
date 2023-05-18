const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

app.use(morgan('tiny'));

app.use((req,res,next) =>{
    req.requestTime = Date.now();
    console.log("here's my first middleware");
    next();
    console.log("here's my first middleware-After")
})

app.use('/dogs',(req,res,next) =>{
    console.log('Dogs')
    console.log("here's my second middleware");
    return  next();
    console.log("here's my second middleware-After")
})

const verifyPassword = ((req,res,next) =>{
    const {password} = req.query;
    if(password === "12345678"){
        next();
    }
    throw new AppError('Password required');
})

/*app.use((req,res,next) =>{
    console.log("here's my third middleware");
    return next();
    console.log("here's my third middleware-After")
})*/

app.get('/',  async(req,res) =>{
    console.log(`Request Date : ${req.requestTime}`);
    res.send("Home Page")
})

app.get('/dogs',  async(req,res) =>{
    res.send("Wooofff!!")
})

app.get('/chicken', (req,res) =>{
    chciken.fly();
})

app.get('/secret',verifyPassword,  async(req,res) =>{
    res.send("Kuch nahi hai secret mera");
})

app.get('/admin', (req,res) =>{
    throw new AppError('You are not Admin',403)
})

app.use((req,res) =>{
    res.status(404).send("Not Found !")
})

app.use((err,req,res,next) =>{
    const {status = 500 , message = 'Something went wrong!'} = err;
    res.status(status).send(message);
})

app.listen(3000, () =>{
    console.log("listening on Port")
})