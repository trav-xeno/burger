const exp = require("express");
const route = require("./routes/route.js");
const db = require("./model/burger");
const PORT = process.env.PORT || 8080;
const app = exp();

// Parse application body as JSON
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(exp.static(__dirname + "/public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(route);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
