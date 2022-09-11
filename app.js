const express = require("express");
const mongoose =require("mongoose");
const bodyParser = require("body-parser");

const app =express();

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/wikiDB"); //making connection to DB


const articleSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:String
});

const Article = mongoose.model("Fighter",articleSchema);

////////////////////////////////Routes to all articles///////////////////////////////
app.route("/articles")

.get(function(req,res){
  Article.find((err,foundArticles)=>{
    if(err)
    console.log(err);
    else
    res.send(foundArticles);
  })
})

.post((req,res) =>{
  const newTitle = req.body.title;
  const newContent = req.body.content;

  const  newArticle = new Article({
    title: newTitle,
    content: newContent
  })

  newArticle.save((err) =>{
    if(err)
    console.log(err);
    else
    res.send(`Succesfully added article titled ${newTitle}`);
  })
})

.delete((req,res) =>{
  Article.deleteMany((err)=>{
    if(err)
    console.log(err);
    else
    res.send(`Successfully deleted all articles`);
  })
});


/////////////////////////// Routes to specific article ///////////////////////////////////////////
app.route("/articles/:articleTitle")

.get((req,res) =>{
  Article.findOne({title: req.params.articleTitle}, (err,foundItem) =>{
    if(err)
    console.log(err);
    else if(foundItem)
    res.send(foundItem);
    else
    res.send("No such article found")
})
})

.put((req,res) =>{
  Article.update({title:req.params.articleTitle}
     ,{title:req.body.title , content:req.body.content},
     {override:true}, //ovverride is False by default
   (err)=>{
    if(err)
    console.log(err);
    else
    res.send(`updated article with title: ${req.params.articleTitle}`);
   })
})

.patch((req,res)=>{
  Article.update({title:req.params.articleTitle} ,
  {$set:req.body} , (err) =>{
    if(err)
    console.log(err);
    else
    res.send(`Updated article with title: ${req.params.articleTitle}`)
  })
})

.delete((req,res) =>{
  Article.findOneAndDelete({title: req.params.articleTitle} ,(err,foundArticle)=>{
    if(err)
    console.log(err);
    else if(foundArticle){
      console.log(foundArticle);    res.send(`Deleted article with Title ${req.params.articleTitle}`)
    }

    else
    res.send(`No such article exists`);
  })
})



///////////////////////////// Configuring Server ///////////////////////////////

app.listen(3000, function(){
  console.log(`Server started at port 3000`);
});
