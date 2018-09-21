//Run the seed: npm run knex seed:run
const db = {
  users: require("../sampleData/users")
}

let key = 2;

//console.log(db.users[key]);

let insertData = {
	uid: db.users[key].uid,
	first_name: db.users[key].first_name,
	last_name: db.users[key].last_name,
	email: db.users[key].email,
	username: db.users[key].username,
	password: db.users[key].password,
	avatar: db.users[key].avatar,
	bio: db.users[key].bio,
};

exports.seed = users;

function users(knex, Promise){
	return knex('users')
    .then(function () {
      return Promise.all([
        knex('users').insert(insertData)
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