// Web Developer: Ivonne Komis
// PURPOSE OF APP: Bamazon is an app that is a storefront on the web(similar to amazon)
// This is a node app that uses inquirer and mySQL
// Used: Javascript Node.js, mySQL npm packages inquirer, figlet, clear and chalk 
// To start I joined products and department as people make purchases via department
// Instead of providing a list to wait for an id entry I provided a CHOICE list from my JOIN table
// It updates the inventory on the products table and it add sales data.

var mysql = require('mysql');
var inquirer = require('inquirer');
var clear = require('clear');
var figlet = require('figlet');
var chalk = require('chalk'); 


var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'root',
	database	: 'bamazon_db',
   	socketPath  : '/Applications/MAMP/tmp/mysql/mysql.sock',
   	port        : 8889
});


connection.connect(function(err){
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadID);
});

var product;
var productList = [];
var productChoice;
var dash = '-';
var selectChoice = "SELECT products.id, departments.department_name, products.product_name, concat('$', format(products.price,2)) as p FROM products LEFT JOIN departments ON products.department_id = departments.id ORDER BY department_name";

// created variable selectChoide init I Left joined products and departments to see department as well as product info.
// from this select created array in order to display CHOICES for input list. 
connection.query(selectChoice, function(error, results) {
	if (error) {
		console.log("* * * * *  Select Choice ERROR: * * * * * \n", error);
		return;
	}else{
		console.log(results);
		for (var i = 0; i < results.length; i++){
		  	// console.log('(id: ' + results[i].id + ')  ' + results[i].product_name + ' ' + results[i].p);
		  	product = '(id: ' + results[i].id + ') ' + results[i].department_name + ': '  + results[i].product_name + ' ' + results[i].p;
			// console.log(product)	
		  	productList.push(product);
		};	

		bamazonLogo();
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
				message: "How many would you like to order?",
				default: 1
			}	
		]).then(function(data){
			// console.log(data);
			// console.log(data.productDept + ' ' + data.quantity);
			var str = data.productDept
			var pos = str.indexOf(')');
			if (pos > -1){
				productChoice = parseInt(str.slice(5,pos))
			}
			var quantity = parseInt(data.quantity);
			// console.log(productChoice)
			// var product = data.productList;
			// console.log('before q select * from product id where ', productChoice)
			connection.query({
						sql: "SELECT * from products where id = ?", 
						values: productChoice
					}, function(error, results){
							// console.log(results);
							// console.log(productChoice, quantity);
							// console.log(results[0].stock_quantity);
							checkInventory(productChoice, quantity, results[0].stock_quantity, data.productDept);
							// console.log('came back from checkinventory');

			}); //connection query
		}); //then promise
	}
		
});


// This function checks Inventory. If available it updates products and inserts data into sales table
function checkInventory(productChoice, howMany, checkStock, productDeptPurchased) {
	// console.log('checkInventory '  + productChoice + ' ' + howMany + ' ' + checkStock + ' ' + productDeptPurchased);
	var  inStock = checkStock - howMany;

	if (inStock < 0){
		for (var i = 0; i < 70; i++) {
			dash = '-' + dash;
		}
		bamazonLogo();
		console.log(dash + '\n')
		console.log(productDeptPurchased);
		
		console.log('\n SORRY, We cannot fill your order at this time. Please change selection.');
		if (checkStock > 0){
			console.log ('\n Quantity requested: ' + howMany + '\n Quantity in Stock Available for Purchase: ' + checkStock)
		};
		console.log('\n'+ dash)
		
	}else{

		// update products deduct howMany from stock_quantity in products table
		connection.query({
						sql: 'UPDATE products SET stock_quantity = ?  WHERE id = ?', 
						values: [inStock, productChoice]
			}, function(error, results){
				if (error) {
					bamazonLogo();
					console.log("* * * * *  Unable to UPDATE stock quantity in Products ERROR: * * * * * \n", error);
					return;
				}else{
					bamazonLogo();
					console.log('UPDATED products table reduced stock_quantity data');
				}
		})

		// add Insert purchase info to sales table
		// console.log('before query INSERT into sales');
		connection.query({
			sql: 'INSERT INTO sales (product_id, quantity_purchased) values (?, ?)',
			values: [productChoice, howMany]
			}, function(error, results){
				if (error) {
					bamazonLogo();
					console.log("* * * * *  Unable to add SALE to sales ERROR: * * * * * \n", error);
					return;
				}else{
					console.log("INSERTED sales data into sales table");
				}
		})

		connection.query({
			sql: "SELECT id, product_name, concat('$', format(price,2)) as p, ?, concat('$', format((price * ?),2)) as total FROM products where id = ?",
			values: [howMany, howMany, productChoice]
			}, function(error, results) {
				if (error) {
					bamazonLogo();
					console.log("* * * * *  Display Purchase ERROR: * * * * * \n", error )
				}else{
					// console.log(results);
					var displayText = 'Product: \n (id:' + results[0].id + ') ' + results[0].product_name + '       ' + howMany + ' x ' + results[0].p + ' \n \n ****  TOTAL PURCHASE: ' + results[0].total + '    ****';		
					for (var i = 0; i < 70; i++) {
						dash = '-' + dash;
					}
					bamazonLogo();
					console.log(dash + '\n');
					console.log(displayText);
					console.log('\n             THANK YOU FOR YOUR PURCHASE!'); 
					console.log('\n' + dash);
				}

		})
	};
};

function bamazonLogo(){
	clear();
	console.log(
	  chalk.blue.bgGreen.bold(
	    figlet.textSync('bamazon', { horizontalLayout: 'full' })
	  )
	);
};