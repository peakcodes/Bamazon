var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
    user: "root",
    password: "",
    database: "Bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    makeSelection()
});

function makeSelection() {
    inquirer.prompt([{
            name: "manager",
            message: "Select option",
            type: "list",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }])
        .then(function (response) {
            switch (response.manager) {
                case 'View Products for Sale':
                    allProducts();
                    break;
                case 'View Low Inventory':
                    viewLowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    addProduct();
                    break;
                case 'Exit':
                    // end connection
                    console.log('Session Over');
                    connection.end();
            }
        })

    function allProducts() {
        connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            console.log(results);
            makeSelection();
        })
    };

    function lowInventory() {
        connection.query("SELECT stock_quantity FROM products WHERE ?", function (err, results) {})
    };

    function addInventory() {
        var idArray = [];
        var currentId
        connection.query("SELECT * FROM products", function (err, results) {
            for (var i = 0; i < results.length; i++) {
                idArray.push(results[i].item_id)
            }
        });
        inquirer
            .prompt([{
                name: "action",
                type: "input",
                message: "What is the ID of the product you would like to update inventory for?",
                validate: function (input) {
                    if (idArray.indexOf(parseInt(input)) > -1) {
                        currentId = input;
                        return true
                    } else {
                        console.log("Not a valid product");
                        return false
                    }
                },
            }, {
                name: "action",
                type: "input",
                message: "What is the new total of units for this product's Inventory?"
            }])
            .then(function (selection) {
                determineQty(selection.action, currentId)

            });

        function determineQty(input, id) {
            var currentQuantity;
            var isValid;

            connection.query("SELECT stock_quantity FROM products WHERE ?", [{
                    item_id: id
                }],
                function (err, res) {
                    //console.log(res);
                    currentQuantity = parseInt(res[0].stock_quantity);
                      if (input>0) {
                        isValid = true;
                        updateQuantity(currentQuantity, input, id);
                        console.log('\n' + "Current Inventory total: " + input);
                    } else {
                        isValid = false
                        console.log('insufficient qty')
                    }
                })
        }
    }

    function updateQuantity (currentQuantity, input, id) {
        currentQuantity === input;
        connection.query("UPDATE products SET ? WHERE ?", [
            {
                stock_quantity: input
            },
            {
                item_id: id        
            }],
        function (err, res) {
            })
        makeSelection();
        }

    function addProduct() {

        inquirer
            .prompt([{
                    name: "item",
                    type: "input",
                    message: "What is the item you would like to add?"
                },
                {
                    name: "department",
                    type: "input",
                    message: "What department would you like to place your item in?"
                },
                {
                    name: "price",
                    type: "input",
                    message: "What would you like the price to be?",
                },
                {
                    name: "inventory",
                    type: "input",
                    message: "What is the total inventory?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                    "INSERT INTO products SET ?", {
                        product_name: answer.item,
                        department_name: answer.department,
                        price: answer.price,
                        stock_quantity: answer.inventory
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your item was added successfully!");
                    }
                );
                makeSelection();
            })
    };
}