bamazon-mysql 

#Bamazon storefront
Bamazon is a online storefront. It uses mySQL and node.js.<br> 
The app gives customers the ability to place an order. The customer starts with a an option to select from a list of items. The npm package used is inquirer. The apps posts the activity processed. If an order is places the app removes the stock item from Bamazon's inventory.<br>
The bamazon.sql file in this repo contains data exported from the database.<br>

## What it looks like:
**How it works...**
![alt text] (http://g.recordit.co/LA3ZZoOs2d.gif "How it works..."
**Screens & Database Structure**
![alt text](screenshots/bamazonScreen1.png "bamazon Product Choice Selection screen")
![alt text](screenshots/bamazonScreen2.png "bamazon Quantity screen")
![alt text](screenshots/bamazonScreen3.png "bamazon Thank you for your purchase screen")
![alt text](screenshots/bamazonScreen4.png "bamazon Unable to fill your order screen")
![alt text](screenshots/bamazon_db-tables.png "bamazon database tables")
![alt text](screenshots/departments-table.png "departments table")
![alt text](screenshots/products-table.png "products table")
![alt text](screenshots/sales-table.png "sales table (products LEFT JOIN with sales)")


## Technologies Used: 
- mySQL relational database
- JavaScript 
- node.js 
- npm modules used:<br>
**inquirer** to prompt user for data. This app used the list choice to display department names and products names<br>
**mysql** to have the ability to access mySQL database using node.js<br>
**chalk** used to change text and background colors<br>
**clear** used to have the ability to clear the screen<br>
**figlet** used to create graphic "BAMAZON" Logo letters<br> 


## Built With:
* Sublime Text 
* MAMP mySQL Database

## Links: 	
- https://ivonnek.github.io/bamizon-mysql/<br>
- https://github.com/IvonneK/bamizon-mysql

## Author: 
**Ivonne Komis**<br>
Member: Rutgers Coding Bootcamp
