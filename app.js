const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const PORT=process.env.PORT || 3000;
const _ = require('lodash');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Hac Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Scelerisque Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let posts=[];

app.get("/",  function(req, res){
    res.render("home", {homeStartingContent:homeStartingContent, posts:posts});
});

app.get('/posts/:postId', function(req, res){
    res.render("post", {posts:posts, postId:_.lowerCase(req.params.postId)});
});

app.post("/", function(req, res){
    const post={
        title:req.body.postTitle,
        content:req.body.postContent,
        postId:_.lowerCase(req.body.postTitle) 
    }
    posts.push(post);
    res.redirect("/");
});

app.get("/compose", function(req, res){
    res.render("compose");
});
app.get("/reset", function(req, res){
    posts=[];
    res.redirect("/");
});

app.get("/about", function(req, res){
    res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contactContent:contactContent});
});

app.listen(PORT, function(){
    console.log(`App listening to ${PORT}`);
});