const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/orders")
  .then(() => {
    console.log("Database connection open");
  })
  .catch((error) => {
    console.log("An error occurred while connecting to Database!!!");
    console.log(error);
  });
