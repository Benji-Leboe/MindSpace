const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

let user = {
	"id": "aca5acf0-bdd6-11e8-b0db-d1c4272aee87",
	"first_name": "asdasd",
	"last_name": "asdasdasdasd",
	"email": "newton6@gmail.com",
	"username": "wesdrw99er",
	"password": "123435",
	"avatar": "",
	"bio": ""
};

function insertUser(user){
	knex.insert(user).into('users')
	.asCallback(function(err, rows){
  	if (err) return err;
	return rows;
  	})
	.finally(function() {
	  knex.destroy();
	});
}