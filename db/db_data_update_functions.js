const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

module.exports = {

	name: "update database functions",
	updatePost: function(newResource){
		//update resource and resource subject into database
		const post_id = newResource.post_id;
		knex('resources')
		.where('post_id', '=', post_id)
		.update(newResource)
		.then((rows) => {
           return rows; 
        }).catch((err) => {
           throw err;
        }); 
	},

	updateSubject: function(newSubject, id){
		//update resource and resource subject into database
		knex.select('*').from('subjects')
		.where('id', '=', id)
		.update(newSubject)
        .then((rows) => {
           return rows; 
        }).catch((err) => {
           throw err;
        });    
	},

	updateComment: function(newComment, id){
		//update resource and resource subject into database
		knex.select('*').from('comments')
		.where('post_id', '=', id)
		.update(newComment)
        .then((rows) => {
           return rows; 
        }).catch((err) => {
           throw err;
        });    
	},

	deletePost: function(post_id){
		//update resource and resource subject into database
		knex.select('*').from('resources')
		.where('post_id', '=', post_id)
		.del()
        .then((rows) => {
           return rows; 
        }).catch((err) => {
           throw err;
        });    
	},
}