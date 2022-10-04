const express = require('express');
const Article = require("../models/models")
const router = new express.Router();

////////////////////////////////Routes to all articles///////////////////////////////
router.route("/articles")

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
router.route("/articles/:articleTitle")

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

module.exports = router;
