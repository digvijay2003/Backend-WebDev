const express = require('express');
const app = express();
const dogsroutes = require('./routers/dogs');
const adminroutes = require('./routers/admin');

app.use('/dogs',dogsroutes)
app.use('/Admin',adminroutes)

app.listen(3000,() =>{
    console.log('listening on port 3000');
})