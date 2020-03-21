// Import orm.js into burger.js to create functions that will interact with the database.
var orm = require("../config/orm.js");

const burger = {
  // Display all burgers in the database
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // Add a new burger to the database
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  // Update a burger's devoured BOOLEAN to true
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Eport burger.js database functions for the controller (burgers_controller.js).
module.exports = burger;
