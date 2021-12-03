const express = require('express');
const mongoose =require('mongoose');
const endpoints = require("./controllers/taskController");
var cors = require('cors');

//This is the start point for the API it defines cors so that I am able to connect
// to it from my frontend. This js file also pulls everything together.
// the endpoints are imported and so on.
mongoose
.connect('mongodb://localhost:27017/newTodoDB', {useNewUrlParser: true})
.then(() => {
    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use(endpoints)
    
    app.listen(3000, function(){
        console.log('Server started on port 3000');
    });
})









