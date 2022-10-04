const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    content:String
  });
  
  module.exports = mongoose.model("Article",articleSchema);