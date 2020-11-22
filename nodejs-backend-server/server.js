//imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Initialize
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
//Parse requests for content type/MIME : application/json  application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sequelize
const db = require("./models");
db.sequelize.sync();



app.get("/", (req, res) => {
  res.json({ message: "Node server is up and running." });

});
require("./routes/admin.routes")(app);
require("./routes/auth.routes")(app);


//set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});