

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
var productChoice;

var selectChoice = "SELECT products.id, departments.department_name, products.product_name, concat('$', format(products.price,2)) as p FROM products LEFT JOIN departments ON products.department_id = departments.id ORDER BY department_name";
// var selectChoice = "SELECT departments.department_name, id, product_name, concat('$', format(price,2)) as p from products left join departments on products.department_id = departments.id"
console.log(selectChoice);
connection.query(selectChoice, function(error, results, fields) {
		console.log(results);
		for (var i = 0; i < results.length; i++){
		  	// console.log('(id: ' + results[i].id + ')  ' + results[i].product_name + ' ' + results[i].p);
			console.log('before product')	  	
		  	product = results[i].id + ')' + results[i].department_name + ': '  + results[i].product_name + ' ' + results[i].p;
			console.log(product)	
		  	productList.push(product);
		};	


	console.log('before inquirer.prompt');

	inquirer.prompt ([
		{type: "input",
			name: "productDept",
			message: "Use arrows SELECT the product you would like to purchase, then press ENTER",
			type: "list",
			choices: 
				productList		
		},
		{type: "input",
			name: "quantity",
			message: "How many would you like to order?"
		}	
	]).then(function(data){
		console.log(data);
		console.log(data.productDept + ' ' + data.quantity);
		var str = data.productDept
		var pos = str.indexOf(')');
		if (pos > -1){
			productChoice = parseInt(str.slice(0,pos))
		}
		var quantity = parseInt(data.quantity);
		console.log(productChoice)
		// var product = data.productList;
		console.log('before q select * from product id where ', productChoice)
		connection.query({
					sql: "SELECT * from products where id = ?", 
					values: productChoice
				}, function(error, results, fields){
						console.log(results);
						console.log(productChoice, quantity);
						console.log(results.stock_quantity);
						checkInventory(productChoice, quantity, results[0].stock_quantity);
						console.log('came back from checkinventory');

		}); //connection query
	}); //then promise
	
});

function checkInventory(productChoice, howMany, checkStock) {
	console.log('checkInventory '  + productChoice + ' ' + howMany + ' ' + checkStock);
	var  inStock = checkStock - howMany;
	if (inStock < 0){
		console.log('Sorry we are currently out of stock. Please make another selection.');
	}else{
		console.log('before update set stock_quantity=', inStock);

		// update products deduct howMany from stock_quantity in products table
		connection.query({
						sql: 'UPDATE products SET stock_quantity = ?  WHERE id = ?', 
						values: [inStock, productChoice]
			}, function(error, results, fields){
				if (error) {
					console.log(error);
				}else{
					console.log('products TABLE UPDATED');
				}
			// console.log("products' UPDATED stock quantity in products. mySQL MESSAGE", results[0].message);
			// console.log(fields); //undefined

		})

		// add Insert purchase info to sales table
		console.log('before query INSERT into sales');
		connection.query({
			sql: 'INSERT INTO sales (product_id, quantity_purchased) values (?, ?)',
			values: [productChoice, howMany]
			}, function(error, results, fields){
				if (error) {
					console.log(error);
				}else{
					console.log("INSERTED sales data into sales TABLE");
				}
		})
	}

};


