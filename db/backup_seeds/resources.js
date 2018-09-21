//Run the seed: npm run knex seed:run
const resDB = {
  resources: require("../sampleData/resources")
}

let key = 6;

//console.log(db);

let insertData = {
	external_url: resDB.resources[key].external_url,
  title: resDB.resources[key].title,
  description: resDB.resources[key].description,
  user_id: resDB.resources[key].user_id
};

exports.seed = resources;

function resources(knex, Promise){
	return knex('resources')
    .then(function () {
      return Promise.all([
        knex('resources').insert(insertData)
      ]);
    }).catch(function(err) {
        // dispatch a failure and throw error
        console.log("You get error------>" + err.constraint);
    });
}

/*
var insertData = {first_name: inputData[0], last_name: inputData[1], birthdate: inputData[2]};

knex.insert(insertData).into('famous_people')
.finally(function() {
  knex.destroy();
});
*/