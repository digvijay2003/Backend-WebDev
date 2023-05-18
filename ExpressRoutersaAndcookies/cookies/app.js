const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// using cookies as middleware :-
app.use(cookieParser());

// cookies //

app.get('/', (req,res) =>{
    const {name = 'abcd'} = req.cookies;
    res.send(`Your cookie name is ${name}`);
    console.log(req.cookies);
})

app.get('/name', (req,res) =>{
    res.cookie('name','cookies');
    res.cookie('animal','Tiger');
    res.send('Ok sent a cokkie !')
})

app.listen(3000, ()=>{
    console.log('Lisenting on port 3000')
});