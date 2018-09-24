const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

module.exports = {
	//Test functions, run below
	//node db/db_query_functions.js
	name: 'query functions',
	findSubjects: (subject) => {
		return knex.select('*').from('subjects')
			.where('subject_name', '=', subject)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	},

	findSubjectPosts: (subject_id) => {
		return knex.select('*').from('categories')
			.where('subject_id', '=', subject_id)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	},

	findUser: (email) => {
		return knex.select('*').from('users')
			.where('email', '=', email)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	},

	findResources: (resource_ids) => {
		return knex.select('*').from('resources')
			.whereIn('id', resource_ids)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	},

	findUserResources:  (user_id) => {
		return knex.select('*').from('users')
			.leftJoin('resources', 'users.id', 'resources.user_id')
			.leftJoin('categories', 'resources.id', 'categories.resource_id')
			.rightJoin('subjects', 'subjects.id', 'categories.subject_id')
			.where('id', '=', user_id)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	},

	findUserLikedResources:  (user_id) => {
		return knex.select('*').from('users')
			.leftJoin('likes', 'users.id', 'likes.user_id')
			.rightJoin('resources', 'resources.id', 'likes.resource_id')
			.leftJoin('categories', 'resources.id', 'categories.resource_id')
			.rightJoin('subjects', 'subjects.id', 'categories.subject_id')
			.where('id', '=', user_id)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	},

	findResourceRating:  (user_id) => {
		return knex.select('*').from('users')
			.leftJoin('ratings', 'users.id', 'ratings.user_id')
			.rightJoin('resources', 'resources.id', 'ratings.resource_id')
			.where('id', '=', user_id)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	},

	findResourceComments: (user_id) => {
		return knex.select('*').from('users')
			.leftJoin('comments', 'users.id', 'comments.user_id')
			.rightJoin('resources', 'resources.id', 'comments.resource_id')
			.where('id', '=', user_id)
			.returning('*')
			.then((rows) => {
				return rows;
			}).catch((err) => {
				throw err;
			});
	}};