const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wikiDB") //making connection to DB
.then(()=> console.log("Connected to DataBase"))
.catch((err)=>console.log(err))