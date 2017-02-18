

var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'root',
	database	: 'bamazon_db',
	PORT        :  8889,
});

// connection.connect(function(err){
// 	if (err) {
// 		console.error('error connecting: ' + err.stack);
// 		return;
// 	}
// 	console.log('connected as id ' + connection.threadID);
// });

connection.connect();
 var table  = "products";

function selectTable(table){
	connection.query('SELECT * from ' + table, function (error, results, fields) {
	  if (error) throw error;
	  console.log('All records from products'); 
	  console.log(results, '\n');
	});
};

connection.query('SELECT * from products', function(error, results, fields)
{
	console.log(results);
	console.log('\n');
	console.log('before inquirer.prompt');

	inquirer.prompt ([
		{type: "input",
			name: "product_id",
			message: "Enter the product id you would like to purchase"
		}	
	]).then(function(data){
		var product = data.product_id;
		console.log('before query');
		console.log('product', product)
		connection.query('SELECT * from products where id=' + product, function(error, results, fields){
			console.log(results);
		});
	});
});


