const query = require('./db_data_query_functions.js');
const insert = require('./db_data_insert_functions.js');

const userid = "aca5acf0-bdd6-11e8-b0db-d1c4272aee59";

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

let resource = {
  "external_url": "www.sfu.com",
  "post_id": "s7ehj2wa",
  "title": "sfu",
  "description": "school",
  "user_id": "aca5acf0-bdd6-11e8-b0db-d1c4272aee59"
};
let subject = {
  "subject_name": "education"
};

query.findUserResources(userid).then(function(result) {
  console.log("let's pass this to html:", result);
});

// insert.insertSource(resource, subject);

// console.log(insert.name);