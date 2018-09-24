exports.up = function(knex, Promise) {

  return Promise.all([
		
    knex.raw('DROP TABLE IF EXISTS users CASCADE'),
    knex.raw('DROP TABLE IF EXISTS resources CASCADE'),
    knex.raw('DROP TABLE IF EXISTS likes CASCADE'),
    knex.raw('DROP TABLE IF EXISTS ratings CASCADE'),
    knex.raw('DROP TABLE IF EXISTS comments CASCADE'),
    knex.raw('DROP TABLE IF EXISTS categories CASCADE'),
	knex.raw('DROP TABLE IF EXISTS subjects CASCADE'),
	    
    knex.schema.createTable('users', function(table) {
      console.log("Users table created");
      table.uuid('id').notNullable().primary();
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('avatar');
      table.string('bio');
    }).createTable('resources', function(table) {
      console.log("Resources table created");
      table.increments('id');
      table.string('post_id').unique();
      table.string('external_url');
      table.string('title');
      table.string('description');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.uuid('user_created').unsigned().references('id').inTable('users');
    }).createTable('subjects', function(table) {
      console.log("Subjects table created");
      table.increments('id');
      table.string('subject_name').notNullable().unique();
    }).createTable('likes', function(table){
      console.log("Likes table created");
      table.string('post_id').unsigned().references('post_id').inTable( 'resources' );
      table.uuid('user_id').unsigned().references('id').inTable( 'users' );
      table.primary(['user_id', 'post_id']);
    }).createTable('ratings', function(table) {
      console.log("Ratings table created");
      table.integer('stars');
      table.string('post_id').unsigned().references('post_id').inTable( 'resources' );
      table.uuid('user_id').unsigned().references('id').inTable( 'users' );
      table.primary(['user_id', 'post_id'])
    }).createTable('comments', function(table) {
      console.log("Comments table created");
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.string('content');
      table.string('post_id').unsigned().references('post_id').inTable( 'resources' );
      table.uuid('user_id').unsigned().references('id').inTable( 'users' );
      table.primary(['user_id', 'post_id']);
    }).createTable('categories', function(table) {
      console.log("Categories table created");
      table.string('post_id').unsigned().references('post_id').inTable( 'resources' ).onDelete('cascade');
      table.integer('subject_id').unsigned().references('id').inTable( 'subjects' );
      table.primary(['post_id', 'subject_id']);
	})
	
  ]);

};

exports.down = function(knex, Promise) {

  return Promise.all([

  	knex.raw('DROP TABLE IF EXISTS users CASCADE'),
  	knex.raw('DROP TABLE IF EXISTS resources CASCADE'),
  	knex.raw('DROP TABLE IF EXISTS likes CASCADE'),
  	knex.raw('DROP TABLE IF EXISTS ratings CASCADE'),
  	knex.raw('DROP TABLE IF EXISTS comments CASCADE'),
  	knex.raw('DROP TABLE IF EXISTS categories CASCADE'),
	knex.raw('DROP TABLE IF EXISTS subjects CASCADE')
	  
  ]);

};

