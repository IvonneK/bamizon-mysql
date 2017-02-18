-- Create the database bamazon_db then use.
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the table departments.
CREATE TABLE departments (
  id int AUTO_INCREMENT NOT NULL, 
  department_name varchar(30) NOT NULL,
  over_head_costs decimal(10,2)  NOT NULL,
  PRIMARY KEY(id));

-- Create the table products.
CREATE TABLE products (
  id int AUTO_INCREMENT NOT NULL, 
  product_name varchar(30) NOT NULL,
  department_id int NOT NULL,
  price decimal(10,2) NOT NULL,
  stock_quantity int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Create the table sales.
CREATE TABLE sales (
  id int AUTO_INCREMENT NOT NULL, 
  product_id int NOT NULL,
  quantity_purchased int NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert a set of records.
INSERT INTO departments (department_name, over_head_costs) VALUES ("Sporting Goods", 20000),  ("Home Services", 5000), ("Clothing and Accessories", 30000);

INSERT INTO products 
	(product_name, department_id, price, stock_quantity) 
VALUES 
	("football", 1, 25.67, 5), 
	("baseball", 1, 17.44, 3),  
	("cell phone", 2, 595.00, 1), 
	("Wireless Headphones", 2, 350.00, 2),
	("Jimmy Choo Tote", 3, 1495.00, 2),
	("Fendi DOTCOM Satchel", 3, 2400.00, 3),
	("SUV WeatherTech Floor Liner", 3, 111.21, 2),
	("Michelin Tire", 3, 216.00, 6)
	("soccer ball", 1, 30.00, 0),
	("fitbit", 2, 125.00, 1)
;



UPDATE departments SET department_name='Electronics' where id=2;





