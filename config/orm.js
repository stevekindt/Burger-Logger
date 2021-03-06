// Import MySQL connection
const connection = require("../config/connection.js");

// Helper function for SQL syntax from Activity 16.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  // Function that returns all table data
  selectAll: function(table, cb) {
    // Returns all rows from the table
    var queryString = "SELECT * FROM " + table + ";";
    // Database query
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // Results in callback
      cb(result);
    });
  },
  // Function that adds one burger to the database
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);
    // Database query
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      // Results in callback
      cb(result);
    });
  },
  // Function that changes burger devoured BOOLEAN to true
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    // Database query
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // Results in callback
      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
