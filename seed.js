const orders = require("./models/orders");
const stores = require("./models/store")
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/orders")
  .then(() => {
    console.log("Connection Open");
  })
  .catch((error) => {
    console.log("Connection Error!!!");
    console.log(error);
  });

const ordersCollection = [
  {
    fullName: "Natanim Eibrahim",
    items: ["Timesquare", "UPS", "Hard Work"],
    price: 24,
    instruction: "Timesquare No Agave!",
  },
  {
    fullName: "Natanim Issa",
    items: ["Hummus Wrap", "Avocado Toat", "NYPD"],
    price: 43,
  },
  {
    fullName: "Natanim ",
    items: ["Acai Bowl", "Cold Filter"],
    price: 18,
    instruction: "Medium hot cold filter!",
  },
];

const storesCollection = [
  {
    name: "OASIS 125",
    location: "3263 Broasway",
    email: "oasisjuiceny@gmail.com",
  },
  {
    name: "OASIS 140",
    location: "1620 Amesterdam",
    email: "oasisjuice140@gmail.com",
  },
  {
    name: "OASIS 163",
    location: "1053 St Nicholas",
    email: "oasisjuice163@gmail.com",
  },
];

const sendDB = async () => {
  await orders.deleteMany({})
  await stores.deleteMany({})
  orders
    .insertMany(ordersCollection)
    .then((data) => {
      console.log("Data inserted");
      console.log(data);
    })
    .catch((error) => {
      console.log("Error ocurred while inserting data!!!");
      console.log(error);
    });

  stores
    .insertMany(storesCollection)
    .then((data) => {
      console.log("Data inserted");
      console.log(data);
    })
    .catch((error) => {
      console.log("Error ocurred while inserting data!!!");
      console.log(error);
    });
}

sendDB()