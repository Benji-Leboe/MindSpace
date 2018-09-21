//Run the seed: npm run knex seed:run
const db = {
  comments: require("../sampleData/comments")
}

let key = 5;

//console.log(db.users[key]);

let insertData = {
  date: db.comments[key].date,
  content: db.comments[key].content,
  resource_id: db.comments[key].resource_id,
  user_id: db.comments[key].user_id
}

exports.seed = comments;

function comments(knex, Promise){
	return knex('comments')
    .then(function () {
      return Promise.all([
        knex('comments').insert(insertData)
      ]);
    }).catch(function(err) {
        // dispatch a failure and throw error
        console.log("You get error------>" + err.constraint);
    });
}