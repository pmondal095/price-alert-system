const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/error");
require("dotenv").config();

const app = express();

app.use(express.json());

//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const price = require("./routes/price");
const alert = require("./routes/alert")
//router middleware
app.use("/api/v1", price);
app.use("/api/v1",alert)

// error middleware
app.use(errorHandler);


// export app js
module.exports = app;
