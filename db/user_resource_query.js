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

let searchData = "0011";

const queryHandler = (err, rows) => {
	if (err) return console.error(err);
  console.log(rows);
};

knex.select('*').from('users')
.leftJoin('resources', 'users.id', 'resources.user_id')
.where('uid', '=', searchData)
.asCallback(queryHandler)
.finally(function() {
  knex.destroy();
});

/*
knex.select('*').from('users')
.where('first_name', '=', searchData)
.asCallback(queryHandler)
.finally(function() {
  knex.destroy();
});
*/