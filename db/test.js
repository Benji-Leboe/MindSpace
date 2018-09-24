const query = require('./db_data_query_functions.js');
const insert = require('./db_data_insert_functions.js');

const userid = "aca5acf0-bdd6-11e8-b0db-d1c4272aee59";
const email = "newton1@gmail.com";
const username = "newton111";

let user = {
	"id": "aca5acf0-bdd6-11e8-b0db-d1c4272aee87",
	"email": "newton6@gmail.com",
	"username": "wesdrw99er",
	"password": "123435",
	"avatar": "",
	"bio": ""
};

let resource = {
  "external_url": "www.sfu.com",
  "post_id": "s7ehj2r8",
  "title": "sfu",
  "description": "school",
  "user_created": "aca5acf0-bdd6-11e8-b0db-d1c4272aee59"
};
let subject = {
  "subject_name": "Sports"
};
// query.findResourceComments(userid).then(function(result) {
//   console.log("let's pass this to html:", result);
// });
// query.findUserResources(userid).then(function(result) {
//   console.log("let's pass this to html:", result);
// });

insert.insertUser(user);

// console.log(insert.name);