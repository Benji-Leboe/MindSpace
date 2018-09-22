//Run the seed: npm run knex seed:run
const userData = require('../sampleData/00_users');
const resourceData = require('../sampleData/01_resources');
const subjectData = require('../sampleData/02_subjects');
const categoryData = require('../sampleData/03_categories');
const commentData = require('../sampleData/04_comments');
const ratingData = require('../sampleData/05_ratings');
const likeData = require('../sampleData/06_likes');

exports.seed = seedTables;

async function seedTables(knex, Promise) {

  const deleteTables = ['categories', 'subjects', 'comments', 'likes', 'ratings', 'resources', 'users'];
  const createTables = ['users', 'resources', 'subjects', 'categories', 'comments', 'ratings', 'likes'];
  const content = [userData, resourceData, subjectData, categoryData, commentData, ratingData, likeData];

  async function deleteContents (tableArr) {
    for (let table of tableArr) {
      await knex(table).delete().then(console.log(table, 'deleted'));
    }
  };

  async function addContents (tableArr, contentArr) {
    for (let [i, table] of tableArr.entries()) {
      console.log('Target table:', table);
      await knex(table).insert(contentArr[i]).returning('*')
      .then(console.log('Attempting to insert', contentArr[i], "in table", table))
      .then(() => {
        knex.raw("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories)+1);"),
        knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments)+1);"),
        knex.raw("SELECT setval('likes_id_seq', (SELECT MAX(id) FROM likes)+1);"),
        knex.raw("SELECT setval('ratings_id_seq', (SELECT MAX(id) FROM ratings)+1);"),
        knex.raw("SELECT setval('subjects_id_seq', (SELECT MAX(id) FROM subjects)+1);"),
        knex.raw("SELECT setval('resources_id_seq', (SELECT MAX(id) FROM resources)+1);"),
        knex.raw("SELECT setval('subjects_id_seq', (SELECT MAX(id) FROM subjects)+1);")
      })
    }
  }
  try {
    await deleteContents(deleteTables);
    await addContents(createTables, content);
  } catch(err){
    console.log('Error: (', err, ') at constraint: (', err.constraint, ')');
  };
}
