const express = require("express");
const bodyParser = require("body-parser");
const articleRouter = require("./router/article.js")
require("./db/conn.js");
const app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(articleRouter)




///////////////////////////// Configuring Server ///////////////////////////////

app.listen(3000, function(){
  console.log(`Server started at port 3000`);
});
