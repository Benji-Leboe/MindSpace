//Run the seed: npm run knex seed:run
const db = {
  categories: require("../sampleData/categories")
}

let key = 9;

//console.log(db.users[key]);

let insertData = {
  resource_id: db.categories[key].resource_id,
  subject_id: db.categories[key].subject_id
}

exports.seed = categories;

function categories(knex, Promise){
	return knex('categories')
    .then(function () {
      return Promise.all([
        knex('categories').insert(insertData)
      ]);
    }).catch(function(err) {
        // dispatch a failure and throw error
        console.log("You get error------>" + err.constraint);
    });
}