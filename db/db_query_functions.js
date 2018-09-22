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
  			if (err) return console.error(err);
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
  			if (err) return console.error(err);
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


