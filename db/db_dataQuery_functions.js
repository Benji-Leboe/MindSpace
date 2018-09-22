const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

let searchEmail = "newton1@gmail.com";

exports.findUser;

//Test functions, run below
//node db/db_query_functions.js
function findUser(email){
  return knex.select('*').from('users')
  		.where('email', '=', email)
  		.asCallback(function(err, rows){
  			if (err) return err;
		    return rows;
  		})
  		.finally(function() {
  			knex.destroy();
  		});
}
/*
findUser(searchEmail).then(function(result) {
	console.log(result);
})
*/

function findUserResources(email){
  return knex.select('*').from('users')
  		.leftJoin('resources', 'users.id', 'resources.user_id')
  		.leftJoin('categories', 'resources.id', 'categories.resource_id')
  		.rightJoin('subjects', 'subjects.id', 'categories.subject_id')
  		.where('email', '=', email)
  		.asCallback(function(err, rows){
  			if (err) return err;
  			return rows;
  		})
  		.finally(function() {
  			knex.destroy();
  		});
}
/*
findUserResources(searchEmail).then(function(result) {
	console.log(result);
})
*/
function findUserLikedResources(email){
  return knex.select('*').from('users')
      .leftJoin('likes', 'users.id', 'likes.user_id')
      .rightJoin('resources', 'resources.id', 'likes.resource_id')
      .leftJoin('categories', 'resources.id', 'categories.resource_id')
      .rightJoin('subjects', 'subjects.id', 'categories.subject_id')
      .where('email', '=', email)
      .asCallback(function(err, rows){
        if (err) return err;
        return rows;
      })
      .finally(function() {
        knex.destroy();
      });
}
/*
findUserLikedResources(searchEmail).then(function(result) {
  console.log(result);
})
*/

function findResourceRating(email){
  return knex.select('*').from('users')
      .leftJoin('ratings', 'users.id', 'ratings.user_id')
      .rightJoin('resources', 'resources.id', 'ratings.resource_id')
      .where('email', '=', email)
      .asCallback(function(err, rows){
        if (err) return err;
        return rows;
      })
      .finally(function() {
        knex.destroy();
      });
}
/*
findResourceRating(searchEmail).then(function(result) {
  console.log(result);
})
*/
function findResourceComments(email){
  return knex.select('*').from('users')
      .leftJoin('comments', 'users.id', 'comments.user_id')
      .rightJoin('resources', 'resources.id', 'comments.resource_id')
      .where('email', '=', email)
      .asCallback(function(err, rows){
        if (err) return err;
        return rows;
      })
      .finally(function() {
        knex.destroy();
      });
}
/*
findResourceComments(searchEmail).then(function(result) {
  console.log(result);
})
*/