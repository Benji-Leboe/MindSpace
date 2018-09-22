var query = require('./db_data_query_functions.js');
var insert = require('./db_data_insert_functions.js');

const email = "newton1@gmail.com";

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
	"external_url": "www.sfu.com",
	"title": "sfu",
	"description": "school",
	"user_id": "aca5acf0-bdd6-11e8-b0db-d1c4272aee59"
}

let subject = {
	"subject_name": "education"
}

query.findResourceRating(email).then(function(result) {
	console.log("let's pass this to html:", result);
});