const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

var knex = require('knex')(knexConfig[ENV]);

module.exports = {
  //Test functions, run below
  //node db/db_query_functions.js
  name: "query functions",
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

  findResources: (post_id) => {
    return knex.select('*').from('resources')
    .whereIn('post_id', post_id)
      .returning('*')
      .then((rows) => {
        return rows;
      }).catch((err) => {
        throw err;
      });
    },

  findUserResources: function(user_id){
    return knex.select('*').from('users')
    	.leftJoin('resources', 'users.id', 'resources.user_created')
    	.where('user_created', '=', user_id)
      .returning('*')
      .then((rows) => {
        return rows;
      }).catch((err) => {
        throw err;
      });
    },

  findUserLikedResources: function(user_id){
    return knex.select('*')
      .from('users')
      .innerJoin('likes', 'users.id', 'likes.user_id')
      .where({ user_id: user_id })
      .rightJoin('resources', 'resources.post_id', 'likes.post_id')
      .returning('*')
      .then((rows) => {
        return rows;
      }).catch((err) => {
        throw err;
      });
  },

  findResourceRating: function(user_id){
    return knex.select('*').from('users')
      .leftJoin('ratings', 'users.id', 'ratings.user_id')
      .rightJoin('resources', 'resources.post_id', 'ratings.post_id')
      .where({ user_id: user_id })
      .returning('*')
      .then((rows) => {
        return rows;
      }).catch((err) => {
        throw err;
      });
    },

  findResourceComments: function(user_id){
    return knex.select('*').from('users')
      .leftJoin('comments', 'users.id', 'comments.user_id')
      .rightJoin('resources', 'resources.post_id', 'comments.post_id')
      .where({ user_id: user_id })
      .returning('*')
      .then((rows) => {
        return rows;
      }).catch((err) => {
        throw err;
      });
    }

}