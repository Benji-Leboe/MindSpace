"use strict";

const express = require('express');
const router  = express.Router();
const uuid    = require('uuid/v1');
const argon2  = require('argon2');
const helper  = require('../helper_functions/helpers');

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
        knex.insert(user).into('users')
        .returning('*')

        .then((rows) => {
          console.log("Insert successful!");
          return rows;

        }).catch((err) => {
          res.status(500).send(err);

        }).then(() => {
          knex.destroy();
          res.status(201).send();
        });
        
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  });

  router.post("/login", (req, res) => {
    let { username, password } = req.body;
  })

  return router;
}
