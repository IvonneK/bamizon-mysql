

var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'root',
	database	: 'bamazon_db',
   	socketPath  : '/Applications/MAMP/tmp/mysql/mysql.sock',
   	port        : 8889
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
	  	for (var i = 0; i < results.length; i++){
	  		console.log('Product id: ' + results[i].id + ' name: ' + results[i].product_name + ' ' + results[i].price + '\n');
	  	}
	});
};

var product;
var productList = [];
var pChoice;
var selectAll = "id, product_name, concat('$', format(price,2)) as p";
var sAll = "SELECT id, product_name, concat('$', format(price,2)) as p from products"
console.log(sAll);
connection.query("SELECT id, product_name, concat('$', format(price,2)) as p from products", function(error, results, fields)
{
	// console.log(results);
	for (var i = 0; i < results.length; i++){
	  	// console.log('(id: ' + results[i].id + ')  ' + results[i].product_name + ' ' + results[i].p);
	  	product = results[i].id + ' ' + results[i].product_name + ' ' + results[i].p;
	  	productList.push(product);
	};	


	console.log('before inquirer.prompt');

	inquirer.prompt ([
		{type: "input",
			name: "product_id",
			message: "Use arrows SELECT the product you would like to purchase, then press ENTER",
			type: "list",
			choices: 
				productList		
		},
		{type: "input",
			name: "quantity",
			message: "How many would you like?"
		}	
	]).then(function(data){
		console.log(data);
		console.log(data.product_id + ' ' + data.quantity);
		var str = data.product_id
		var pos = str.indexOf(' ');
		if (pos > -1){
			pChoice = parseInt(str.slice(0,pos))
		}
		console.log(pChoice)
		var product = data.product_id;
		console.log('before q', product)
		connection.query('SELECT * from products where id=' + pChoice, function(error, results, fields){
			console.log('results: ' + results);
			console.log(data.product_id, data.quantity);
			console.log(results[0].stock_quantity);
			checkInventory(pChoice, data.quantity, results[0].stock_quantity);
			console.log('came back from inventory');

		}); //connection query
	}); //then promise
	
});

function checkInventory(productChoice, howMany, inStock) {
	console.log('checkInventory '  + productChoice + ' ' + howMany);
	var checkStock = inStock - howMany;
	if (checkStock < 0){
		console.log('Sorry currently out of stock');
	}else{
		console.log('update set stock=', checkStock);
		// connection.query('UPDATE products SET stock_quantity = ' + checkStock + ' WHERE id = ' + productChoice + "'", function(error, results, fields){
		// 	console.log(results);
		// })
	}

};


