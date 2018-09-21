//Run the seed: npm run knex seed:run
const db = {
  subjects: require("../sampleData/subjects")
}

let key = 0;

//console.log(db.users[key]);

let insertData = {
  name: db.subjects[key].name,
}

exports.seed = subjects;

function subjects(knex, Promise){
	return knex('subjects')
    .then(function () {
      return Promise.all([
        knex('subjects').insert(insertData)
      ]);
    }).catch(function(err) {
        // dispatch a failure and throw error
        console.log("You get error------>" + err.constraint);
    });
}