const query = require("./user_resource_query");


function getUser(email) {
	query.findUserName(email).then(function(result) {
		console.log("let's pass this to html:", result);
	});
}

getUser("newton1@gmail.com");


