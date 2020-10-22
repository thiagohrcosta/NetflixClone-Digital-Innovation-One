const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/js/owl'))

app.use(express.static("style"));
app.use(express.static(__dirname + '/style'));

app.use(express.static(__dirname + '/style/owl'));

mongoose.connect("mongodb+srv://admin-app:123456app@movieapi.z0kfu.mongodb.net/movietrailer", {useNewUrlParser: true});

const postSchema = {
  title: String,
  rating: Number,
  coverBox: String,
  mainActor: String,
  launchYear: String,
  youtubeTrailer: String,
  sinopse: String,
}

const movieSchema = {
  title: String,
  rating: Number,
  coverBox: String,
  mainActor: String,
  launchYear: String,
  youtubeTrailer: String,
  sinopse: String,
}
const Post = mongoose.model("Post", postSchema);
const MoviePost = mongoose.model("MoviePost", postSchema);


app.get("/", function(req, res){
  
  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
    });
  })
})

app.get("/postcontent", function(req, res){
  res.render("postcontent");
})

app.get('/postMovie', function(req, res){
  res.render("postcontent");
})

app.post("/postcontent", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    rating: req.body.imdbRating,
    coverBox: req.body.coverBox,
    mainActor: req.body.mainActor,
    launchYear: req.body.launchYear,
    youtubeTrailer: req.body.youtubeTrailer,
    sinopse: req.body.postSinopse
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  })
})

app.post("/postMovie", function(req, res){
  const moviePost = new MoviePost({
    title: req.body.postTitle,
    rating: req.body.imdbRating,
    coverBox: req.body.coverBox,
    mainActor: req.body.mainActor,
    launchYear: req.body.launchYear,
    youtubeTrailer: req.body.youtubeTrailer,
    sinopse: req.body.postSinopse
  });

  moviePost.save(function(err){
    if(!err){
      res.redirect("/");
    }
  })
})

app.get("/postcontent", function(req, res){
  Post.find(function(err, foundItems){
    if(!err){
      res.send(foundItems);
    }
    else{
      res.send(err);
    }
  })
})

app.get("/postcontent/:id", function(req, res){
  const requestedPostId = req.params.id;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("tvShowContent", {
      title: post.title,
      rating: post.rating,
      coverBox: post.coverBox,
      mainActor: post.mainActor,
      launchYear: post.launchYear,
      youtubeTrailer: post.youtubeTrailer,
      sinopse: post.sinopse
    })
  })


});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function(){
  console.log("Server has started successfully.")
})