const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

module.exports = {

	name: "update database functions",
	updatePost: function(newResource){
		//update resource and resource subject into database
		const post_id = newResource.post_id;
		console.log(newResource);
		knex('resources')
		.where('post_id', '=', post_id)
		.update(newResource)
	},

	updateSubject: function(newSubject){
		//update resource and resource subject into database
		console.log(newSubject);
		knex('subjects')
		.where('subject_name', '=', 'Sports333')
		.update(newSubject)
	},
}