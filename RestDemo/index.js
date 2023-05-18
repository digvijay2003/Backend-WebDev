const { Cipher } = require('crypto');
const express = require('express');
const app = express();
const path = require('path')
const {v4 : uuid} = require('uuid')
var methodOverride = require('method-override')
uuid();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')
app.use(methodOverride('_method'))

let comments = [
    {
        id : uuid(),
        username : "Digu",
        comment : 'hello , how are you '
    },
    {
        id : uuid(),
        username : "Ram",
        comment : 'hello , ram '
    },
    {
        id : uuid(),
        username : "Sham",
        comment : 'hello , sham '
    }
]

app.get('/comments/new', (req,res) =>{
    res.render('app')
})

// get route for comments :-
app.get('/comments', (req,res) =>{
    res.render('home', {comments})
})

// get route for comments :-
app.post('/comments', (req,res) =>{
    const {username,comment} = req.body;
    comments.push({username,comment,id : uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id', (req,res) =>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('show', {comment})
})

app.patch('/comments/:id', (req,res) =>{
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment =  newCommentText;
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req,res) =>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('edit', {comment})
})

app.delete('/comments/:id', (req,res) =>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req,res) =>{
    res.send('Get /tacos Response')
})

app.post('/tacos', (req,res) =>{
    console.log(req.body)
    res.send('Post /tacos Response')
})


app.listen('3000', ()=>{
    console.log('Listen on port 3000')
})