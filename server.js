"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const cookieSession = require('cookie-session');
const memjs       = require('memjs');
const bcrypt      = require('bcryptjs');
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const $           = process.env;

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, 
//         cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//configure cookie-session
app.use(cookieSession({
  name: 'session',
  keys: [$KEY1, $KEY2]
}));

/* APP GET ROUTES */

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page - list of subjects in grid format
app.get("/", (req, res) => {
  res.render("index");
});

// view profile- bio etc.
app.get("/:user_id/profile", (req, res) => {
  res.render("user_profile");
});

// view main user page w/ posts and likes
app.get("/:user_id", (req, res) => {
  res.render("user_posts");
});

// view posts for specific subject
app.get("/:subject_id", (req, res) => {
  res.render("subject_list");
});

// view post in specific subject 
//**TODO: Make AJAX function to render over posts
app.get("/:subject_id/:post_id", (req, res) => {
  res.render('view_post');
});

/* APP POST ROUTES */

// register user via AJAX and submit json data to DB
app.post('/register', (req, res) => {

});

// check user login and get user data from DB, relay to app.js via AJAX
app.post('/login', (req, res) => {

});

// clear user session
app.post('/logout', (req, res) = {

});

// submit post, add subject tags, assign unique ID and reference user ID
// store in DB
app.post('/post', (req, res) => {
  
});

// edit post
// (user can only edit own post) 
app.put('/post/:post_id', (req, res) => {

});

// owner remove post from DB
app.delete('/post/:post_id', (req, res) => {

});

// like post, increment like count, add post to user likes 
// (user cannot like own post)
app.put('/like', (req, res) => {

});

// rate post, calculate average and display
// (user cannot rate own post) 
app.put('/rate', (req, res) => {

});

// submit comment
app.post('/comment', (req, res) => {

});

// edit comment
// (user can only edit own comment)
app.put('comment/:comment_id', (req, res) => {

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
