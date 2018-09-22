const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

module.exports = {

	insertUser: function(user){
	//insert user into database
		knex.insert(user).into('users')
		.asCallback(function(err, rows){
	  	if (err) return err;
		return rows;
	  	})
		.finally(function() {
		  knex.destroy();
		});
	}

	insertSource: function(source, subject){
	//insert resource and resource subject into database
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

	insertLike: function(userid, resourceid){
	//insert current user liked resource
		let userid_resourceid = {user_id: userid, resource_id: resourceid};
		knex.insert(userid_resourceid).into('likes')
		.asCallback(function(err, rows){
	  	if (err) return err;
		return rows;
	  	})
		.finally(function() {
		  knex.destroy();
		});
	}

	insertRating: function(userid, resourceid, rating){
	//insert current user rating to resource
		let userid_resourceid_rating = {user_id: userid, resource_id: resourceid, stars: rating};
		knex.insert(userid_resourceid_rating).into('ratings')
		.asCallback(function(err, rows){
	  	if (err) return err;
		return rows;
	  	})
		.finally(function() {
		  knex.destroy();
		});
	}

	insertComment: function(userid, resourceid, comment){
	//insert current user comment to resource
		let userid_resourceid_comment = {user_id: userid, resource_id: resourceid, content: comment};
		knex.insert(userid_resourceid_comment).into('comments')
		.asCallback(function(err, rows){
	  	if (err) return err;
		return rows;
	  	})
		.finally(function() {
		  knex.destroy();
		});
	}
}