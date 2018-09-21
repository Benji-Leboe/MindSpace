const pg = require("pg");

var knex = require('knex')({
	client: 'pg',
	version: '7.4.3',
  	connection: {
    host : '127.0.0.1',
    user : 'labber',
    password : 'labber',
    database : 'midterm',
    }
});
console.log(knex);
let searchData = "0011";

const queryHandler = (err, rows) => {
	if (err) return console.error(err);
  console.log(rows);
};

knex.select('*').from('users')
.leftJoin('likes', 'users.id', 'likes.user_id')
.rightJoin('resources', 'resources.id', 'likes.resource_id')
.where('uid', '=', searchData)
.asCallback(queryHandler)
.finally(function() {
  knex.destroy();
});