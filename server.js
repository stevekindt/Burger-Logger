var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();
const bodyParser = require("body-parser");
// Serve static content for the app from the "public" directory in the application directory.
app.use("/", express.static(__dirname, +"public"));

// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
