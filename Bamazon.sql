DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INTEGER(11),
    stock_quantity INTEGER(11),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Macbook Pro", "Apple", 2000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Pro ", "Apple", 1000, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HomePod", "Apple", 400, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("100% Cotton V-Neck (blessed by Pope)", "Apparel", 1000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Splashed Black Paint White-T (COA included)", "Apparel", 500, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1990's Jazz NBA Short Shorts", "Apparel", 50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 55-inch 4K TV", "Entertainment", 1500, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LG B6 OLED 60-inch TV", "Entertainment", 2000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Song 70-inch 4k OLED TV", "Entertainment", 5000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Westinghouse 32-inch 720p TV", "Entertainment", 100, 50);