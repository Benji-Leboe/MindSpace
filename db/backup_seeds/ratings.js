//Run the seed: npm run knex seed:run
const db = {
  ratings: require("../sampleData/ratings")
}

let key = 0;

//console.log(db.users[key]);

let insertData = {
  stars: db.ratings[key].stars,
	resource_id: db.ratings[key].resource_id,
	user_id: db.ratings[key].user_id
}

exports.seed = ratings;

function ratings(knex, Promise){
	return knex('ratings')
    .then(function () {
      return Promise.all([
        knex('ratings').insert(insertData)
      ]);
    }).catch(function(err) {
        // dispatch a failure and throw error
        console.log("You get error------>" + err.constraint);
    });
}