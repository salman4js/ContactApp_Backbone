const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/Scripts'));

const routes = require("./routes/Routes.js");

const database = "mongodb+srv://salman:pamelia@cluster0.39n4dr9.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(database,{
  useNewUrlParser : true,
})

mongoose.connection.on("connected", () => {
  console.log("Database connected");
})

mongoose.connection.on("error", (err) => {
  console.log("Some internal error has occured ", err);
})

app.use("/", routes);

app.listen(4000, () => {
  console.log("Server is running!");
});



