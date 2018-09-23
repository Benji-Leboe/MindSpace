"use strict";

require('dotenv').config();

process.title = "mindspace";

const cluster              = require('cluster');

const PORT                 = process.env.PORT || 8080;
const ENV                  = process.env.ENV || "development";
const $                    = process.env;

const express              = require("express");
const bodyParser           = require("body-parser");
const sass                 = require("node-sass-middleware");
const session              = require('express-session');
    
// memory cache    
const memjs                = require('memjs');
const MemcachedStore       = require('connect-memjs')(session);
const mc                   = memjs.Client
                             .create(process.env.MEMCACHIER_SERVERS 
                                || 'localhost:11211', 
                                {
                                  failover: false,  // default: false
                                  timeout: 1,      // default: 0.5 (seconds)
                                  keepAlive: true  // default: false
                                });

// unique userID for user in DB 
const uuid                 = require('uuid/v1');

const app                  = express();

const knexConfig           = require("./knexfile");
const knex                 = require("knex")(knexConfig[ENV]);
const morgan               = require('morgan');
const knexLogger           = require('knex-logger');

//local imports
const helper               = require('./helper_functions/helpers');
const query                = require('./db/db_data_query_functions.js');
const insert               = require('./db/db_data_insert_functions.js');


// Mount router and user query routes
const usersRoutes          = require("./routes/users");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, 
//         cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

if (cluster.isMaster) {

  const WORKERS = process.env.WEB_CONCURRENCY || 1;

  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {

    console.log('Worker %d died:', worker.id, "in process", process.pid);
    cluster.fork();

  });

} else {

//configure session
const store = new MemcachedStore({
  hosts: process.env.MEMCACHIER_SERVERS || 
         process.env.MEMCACHE_SERVERS || ['localhost:11211']});

app.use(session({
  genid: (req) => {
    return uuid();
  },
  secret: [ $.KEY1, $.KEY2 ],
  store, 
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

const cacheView = (req, res, next) => {
  // let view_key = '_view_cache_' + req.originalUrl || req.url;
  // mc.get(view_key, (err, val) => {
  //   if (err === null && val !== null) {
  //     res.send(val.toString('utf8'));
  //     return;
  //   }
  //   res.sendRes = res.send;
  //   res.send = (body) => {
  //     mc.set(view_key, body, { expires: 0 }, (err, val) => {
  //       if (err) throw err;
  //     });
  //     res.sendRes(body);
  //   }
  //   next();
  // });
  next();
}

  /* APP GET ROUTES */

  // Mount all resource routes
  app.use("/api/users", usersRoutes(knex));

  // Home page - list of subjects in grid format
  app.get("/", cacheView, (req, res) => {
    res.render("index");
  });

  app.get("/ardelia", cacheView, (req, res) => {
    res.render("test_templates");
  });

  app.get("/rohit", cacheView, (req, res) => {
    res.render("rohit");
  });

  // view profile- bio etc.
  app.get("/profile/:user_id", cacheView, (req, res) => {
    res.render("user_profile");
  });

  // view main user page w/ posts and likes
  app.get("/posts/:user_id", cacheView, (req, res) => {
    const user_id = req.params.user_id;
    console.log(userid);
    query.findUserResources(user_id).then((result) => {
      console.log("let's pass this to html:", result);
    });
    res.send('hello world');
    //res.render("user_posts");
  });

  // view posts for specific subject
  app.get("/subjects/:subject_id", cacheView, (req, res) => {
    let subject = req.params.subject_id;
    //query subject from DB

    res.render("subject_list");
  });

  // view post in specific subject 
  //**TODO: Make AJAX function to render over posts
  app.get("/subjects/:subject_id/:post_id", cacheView, (req, res) => {
    res.render('view_post');
  });

  /* APP POST ROUTES */

  // clear user session
  app.post('/logout', (req, res) => {
    store.destroy(req.session.id, (err) => {
      if (err) throw err;
    });
    req.session.destroy((err) => {
      if (err) throw err; 
    });
    res.status(201).send();
  });

  // submit post, add subject tags, assign unique ID and reference user ID
  // store in DB
  app.post('/post', (req, res) => {
    const { external_url, title, description, user_id, subject_name } = req.body;
    let post_id = helper.generateRandomString();

    let resource = {
      external_url,
      post_id,
      title,
      description,
      user_id
    };
    let subject = {
      subject_name
    };
    insert.insertSource(resource, subject);
    res.end();

  });

  // like post, increment like count, add post to user likes 
  // (user cannot like own post)
  app.put('/like', (req, res) => {

    const { user_id, resource_id } = req.body;

    insert.insertLike(user_id, resource_id);
    res.end();

  });

  // rate post, calculate average and display
  // (user cannot rate own post) 
  app.put('/rate', (req, res) => {

    const { user_id, resource_id, rating } = req.body;

    insert.insertRating(user_id, resource_id, rating);
    res.end();

  });

  // submit comment
  app.post('/comment', (req, res) => {

    const userid = req.body.user_id;
    const resourceid = req.body.resource_id;
    const comment = req.body.comment;

    insert.insertComment(userid, resourceid, comment);
    res.end();

  });

  // edit post
  // (user can only edit own post) 
  app.put('/post/edit/:post_id', (req, res) => {

  });

  // owner remove post from DB
  app.delete('/post/delete/:post_id', (req, res) => {

  });

  // edit comment
  // (user can only edit own comment)
  app.put('comment/:comment_id', (req, res) => {

  });

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

}