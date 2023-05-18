const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MovieApp')
.then(() =>{
    console.log("Connection made");
})
.catch(err =>{
    console.log("error made !");
    console.log(err);
})
const movieschema = new mongoose.Schema({
    tittle:String,
    year:Number,
    score:Number,
    rating:String
});

const Movie = mongoose.model('Movie', movieschema);
//const amadeus= new Movie({tittle:"amadeus",year: 2001,score: 9,rating:"good"});

Movie.insertMany([
    {tittle:"Amadeus",year: 2001,score: 7,rating:"G"},
     {tittle:"Annabel",year: 2015,score: 9,rating:"E"},
      {tittle:"Welcome",year: 2011,score: 7.5,rating:"G"},
       {tittle:"K.G.F(chapter-2)",year: 2022,score: 9.8,rating:"O"},
])
.then(data =>{
    console.log("it worked!");
    console.log(data);
})