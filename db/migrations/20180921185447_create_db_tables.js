

exports.up = function(knex, Promise) {
	return Promise.all([
		
		knex.raw('DROP TABLE IF EXISTS users CASCADE'),
		knex.raw('DROP TABLE IF EXISTS resources CASCADE'),
		knex.raw('DROP TABLE IF EXISTS likes CASCADE'),
		knex.raw('DROP TABLE IF EXISTS ratings CASCADE'),
		knex.raw('DROP TABLE IF EXISTS comments CASCADE'),
		knex.raw('DROP TABLE IF EXISTS categories CASCADE'),
		knex.raw('DROP TABLE IF EXISTS subjects CASCADE'),

		knex.schema.createTable('users', function(table){
      console.log("Users table created");
      table.uuid('id').notNullable().primary();
		    table.string('first_name');
		    table.string('last_name');
		    table.string('email').notNullable().unique();
		    table.string('username').notNullable().unique();
		    table.string('password');
		    table.string('avatar');
        table.string('bio');
        
		}).createTable('resources', function(table){
      console.log("Resources table created");
			table.increments('id');
			table.string('external_url');
		    table.string('title');
		    table.string('description');
		    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.uuid('user_id').unsigned().references('id').inTable('users');
        
    }).createTable('subjects', function(table){
      console.log("Subjects table created");
			table.increments('id');
      table.string('name').notNullable().unique();
      
		}).createTable('likes', function(table){
      console.log("Likes table created");
			table.increments('id');
			table.integer('resource_id').unsigned().references('id').inTable( 'resources' );
		    table.uuid('user_id').unsigned().references('id').inTable( 'users' );

		}).createTable('ratings', function(table){
      console.log("Ratings table created");
			table.increments('id');
			table.integer('stars');
			table.integer('resource_id').unsigned().references('id').inTable( 'resources' );
        table.uuid('user_id').unsigned().references('id').inTable( 'users' );
        
		}).createTable('comments', function(table){
      console.log("Comments table created");
			table.increments('id');
			table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		    table.string('content');
		    table.integer('resource_id').unsigned().references('id').inTable( 'resources' );
        table.uuid('user_id').unsigned().references('id').inTable( 'users' );
        
		}).createTable('categories', function(table){
      console.log("Categories table created");
			table.increments('id');
		    table.integer('resource_id').unsigned().references('id').inTable( 'resources' );
		    table.integer('subject_id').unsigned().references('id').inTable( 'subjects' );
		})

		
	])
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

