const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

module.exports = {

	name: 'insert functions',

	insertUser: function (user) {
		//insert user into database
		knex.insert(user).into('users')
			.asCallback(function (err, rows) {
				if (err) return err;
				return rows;
			})
			.finally(function () {
				knex.destroy();
			});
	},

	insertSource: function (resource, subject) {
		//insert resource and resource subject into database
		knex('resources')
			.returning('post_id')
			.as('post_id')
			.insert(resource)
			.then(([post_id]) => {
				knex('subjects')
					.returning('id')
					.as('subject_id')
					.insert(subject)
					.then(([subject_id]) => {
						knex('categories')
							.insert({
								post_id: post_id,
								subject_id: subject_id
							})
							.finally(function () {
								knex.destroy();
							});
					});
			});
	},

	insertLike: function (userid, postid) {
		//insert current user liked resource
		let userid_postid = {
			user_id: userid,
			post_id: postid
		};
		knex.insert(userid_postid).into('likes')
			.asCallback(function (err, rows) {
				if (err) return err;
				return rows;
			})
			.finally(function () {
				knex.destroy();
			});
	},

	insertRating: function (userid, postid, rating) {
		//insert current user rating to resource
		let userid_postid_rating = {
			user_id: userid,
			post_id: postid,
			stars: rating
		};
		knex.insert(userid_postid_rating).into('ratings')
			.asCallback(function (err, rows) {
				if (err) return err;
				return rows;
			})
			.finally(function () {
				knex.destroy();
			});
	},

	insertComment: function (userid, postid, comment) {
		//insert current user comment to resource
		let userid_postid_comment = {
			user_id: userid,
			post_id: postid,
			content: comment
		};
		knex.insert(userid_postid_comment).into('comments')
			.asCallback(function (err, rows) {
				if (err) return err;
				return rows;
			})
			.finally(function () {
				knex.destroy();
			});
	}
};