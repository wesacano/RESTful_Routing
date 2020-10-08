var express = require("express"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, deafult: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "data:image/jpeg;base64,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",
//     body: "Hello this is a Blog Post!"
// })

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
})

//INDEX Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error")
        } else {
            res.render("index", {blogs: blogs})
        }
    })
})

//NEW Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs")
        }
    })
})

//SHOW Route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog})
        }
    })
})

//EDIT Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE Route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//DELETE Route
app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(3000, function(){
    console.log("Server is running");
});