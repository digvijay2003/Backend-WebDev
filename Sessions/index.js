const express = require('express');
const app = express();
const session = require('express-session');

// using session as middleware //

app.use(session({ secret:'secret is nothing', resave: false, saveUninitialized: false }));

app.get('/count' , (req,res) =>{
    if(req.session.count){
        req.session.count+=1;
    }
    else{
        req.session.count=1;
    }

    res.send(`views :- ${req.session.count}`)
})

app.get('/username' , (req,res) =>{
    const {username = 'anonymous'} = req.query;
    req.session.username = username;
    res.redirect('/greet')
});

app.get('/greet' , (req,res) =>{
    const {username} = req.session;
    res.send(`you name is : ${username}`);
});

app.listen(5000,() =>{
    console.log('listening on port 5000');
})