const express = require('express');
const router = express.Router();

///using middleware////
router.use((req,res,next) =>{
    if(!req.query.idAdmin){
        next();
    } 
    res.send('Sorry, but your not an admin to access this!')
})

router.get('/secret', (req,res) =>{
    res.send('chala ja b**k!')
})

module.exports = router;