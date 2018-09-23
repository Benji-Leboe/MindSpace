"use strict";

const express  = require('express');
const router   = express.Router();
const uuid     = require('uuid/v1');
const helper   = require('../helper_functions/helpers');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/register", (req, res) => {
    let { email, username, password, passwordCheck } = req.body;
    console.log("request recieved");

    if (password !== passwordCheck){
      res.status(403).send();
      
    } else {
      
      helper.passHasher(password).then((result) => {
        let user = {
          "id": uuid(),
          email,
          username,
          "password": result
        };
        return user;

      }).then((user) => {
        console.log(user);
        req.session.user_id = user.id;
        knex.insert(user).into('users')
        .returning('*')
        .then((rows) => {
          console.log("Insert successful!");
          return rows;

        }).catch((err) => {
          res.status(500).send(err);

        }).then(() => {
          
          res.status(201).send(true);
        });
        
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  });

  router.post("/login", (req, res) => {

    if (!req.body.email || req.body.username) {
      res.status(401).send();
    } else {
      let { email, password } = req.body;
      console.log("Request password:", password);

      return knex.select('*').from('users')
      .where('email', '=', email)
      .then((rows) => {
        console.log("Query successful!");
        return rows;
      }).catch((err) => {
        res.status(500).send(err);
      }).then((result) => {
        console.log('Result:', result, 'Password:', result[0].password);
        helper.hashCheck(result[0].password, password)
        .then((match) => {
          console.log(match);
          if (match) {
            req.session.user_id = result[0].id;
            console.log(req.session.user_id);
            res.status(201).send(true);
          } else {
            res.status(401).send(false);
          }
        }).catch(err => {
          res.status(500).send(err);
        });
      });
    }
  });


  return router;
}
