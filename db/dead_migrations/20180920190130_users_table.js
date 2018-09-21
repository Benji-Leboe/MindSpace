
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('users', function(table){
			table.increments();
			table.string('uid');
		    table.string('first_name');
		    table.string('last_name');
		    table.string('email');
		    table.string('username');
		    table.string('password');
		    table.string('avatar');
		    table.string('bio');
		    table.unique('uid');
		    table.unique('email');
		    table.unique('username');
		}),

		knex.schema.createTable('resources', function(table){
			table.increments();
			table.string('external_url');
		    table.string('title');
		    table.string('description');
		    table.string('create_at');
		    table.string('user_id');
		}),

		knex.schema.createTable('likes', function(table){
			table.increments();
			table.integer('resource_id').references('id').inTable( 'resources' );
		    table.integer('user_id').references('id').inTable( 'users' );

		}),

		knex.schema.createTable('ratings', function(table){
			table.increments();
			table.integer('stars');
			table.integer('resource_id').references('id').inTable( 'resources' );
		    table.integer('user_id').references('id').inTable( 'users' );
		}),

		knex.schema.createTable('comments', function(table){
			table.increments();
			table.date('date');
		    table.string('content');
		    table.integer('resource_id').references('id').inTable( 'resources' );
		    table.integer('user_id').references('id').inTable( 'users' );
		}),

		knex.schema.createTable('categories', function(table){
			table.increments();
		    table.integer('resource_id').references('id').inTable( 'resources' );
		    table.integer('subject_id').references('id').inTable( 'subjects' );
		}),

		knex.schema.createTable('subjects', function(table){
			table.increments();
			table.string('name');
			table.unique('name');
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users'),
		knex.schema.dropTable('resources'),
		knex.schema.dropTable('likes'),
		knex.schema.dropTable('ratings'),
		knex.schema.dropTable('comments'),
		knex.schema.dropTable('categories'),
		knex.schema.dropTable('subjects')
    ])
};
