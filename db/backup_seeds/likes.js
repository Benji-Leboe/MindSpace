//Run the seed: npm run knex seed:run
const db = {
  likes: require("../sampleData/likes")
}

let key = 5;

//console.log(db.users[key]);

let insertData = {
	resource_id: db.likes[key].resource_id,
	user_id: db.likes[key].user_id
}

exports.seed = likes;

function likes(knex, Promise){
	return knex('likes')
    .then(function () {
      return Promise.all([
        knex('likes').insert(insertData)
      ]);
    }).catch(function(err) {
        // dispatch a failure and throw error
        console.log("You get error------>" + err.constraint);
    });
}