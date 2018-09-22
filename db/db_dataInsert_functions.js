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

let source = {
	"external_url": "www.sfu3.com",
	"title": "sfu3",
	"description": "school3",
	"user_id": "aca5acf0-bdd6-11e8-b0db-d1c4272aee59"
}

let subject = {
	"subject_name": "education7129"
}

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

function insertSource(source, subject){

	knex("resources")
	.returning("id")
	.as("source_id")
	.insert(source)
	.then(([source_id]) => {
		console.log(source_id);
		knex("subjects")
		.returning("id")
		.as("subject_id")
		.insert(subject)
		.then(([subject_id]) => {
			console.log(source_id, subject_id);
			knex("categories")
			.insert({resource_id: source_id, subject_id: subject_id})
			.finally(function() {
				knex.destroy();
			});
		})
	})
}

insertSource(source, subject);