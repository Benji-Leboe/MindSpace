const ENV = process.env.ENV || 'development';
const knexConfig = require('./knexfile');

var knex = require('knex')(knexConfig[ENV]);

let searchData = "0011";

const queryHandler = (err, rows) => {
	if (err) return console.error(err);
  console.log(rows);
};

knex.select('*').from('users')
.leftJoin('likes', 'users.id', 'likes.user_id')
.rightJoin('resources', 'resources.id', 'likes.resource_id')
.where('uid', '=', searchData)
.asCallback(queryHandler)
.finally(function() {
  knex.destroy();
});