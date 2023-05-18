const express =  require('express');
const app = express();
const redditdata = require('./data.json')
//console.log(redditdata)

app.use(express.static("public"))

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('views');
})

/*app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params;
    res.render('view', {subreddit});
})*/

app.listen('3030', ()=>{
    console.log('listening on port 3030')
})

// for home.ejs :-
app.get('/rand',(req,res)=>{
    const num = Math.floor(Math.random()*10 + 1);
    res.render('view',{num : num});
})

app.get('/cats',(req,res)=>{
    const cats = ['billu','lillu','gillu','shillu','nillu']
    res.render('home',{cats});
})

// subreddit exercise :-
app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params;
    const data = redditdata[subreddit];
    if (data){
        res.render('subreddit', {...data});
    } else{
        res.render('notfound', {subreddit});
    }
})