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
    allProducts();
    searchProducts();
});

function allProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
    });
}
// create product search function
function searchProducts() {
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
            message: "What is the ID of the product you would like to buy from this list?",
            validate: function (input) {
                if (idArray.indexOf(parseInt(input)) > -1) {
                    currentId = input;
                    return true
                } else {
                    console.log("Not a valid product");
                    return false
                    searchProducts();
                }
            },
        }, {
            name: "action",
            type: "input",
            message: "How many units of this product would you like to buy?"
        }])
        .then(function (selection) {
        determineQty(selection.action, currentId)

        });
}

function determineQty(input, id){
    var currentQuantity;
    var isValid;

    connection.query("SELECT stock_quantity FROM products WHERE ?", [{
        item_id: id
    }],
    function (err, res) {
        //console.log(res);
        currentQuantity = parseInt(res[0].stock_quantity);
        console.log('\n' + "Inventory total: " + currentQuantity);

        if(currentQuantity > input){
           console.log('valid amount')
           isValid = true;
           updateQuantity(currentQuantity, input, id);
        } else {
            isValid = false
            console.log('insufficient qty')
        }
    })
    
}

function updateQuantity (currentQuantity, input, id) {
    currentQuantity -= input;
    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: input
        },
        {
            item_id: id        
        }],
    function (err, res) {
        console.log("We can fill your order! Thanks for stopping by");
        })
        connection.end();
    }