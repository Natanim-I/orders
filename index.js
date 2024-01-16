const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const database = require("./databaseconfig.js");
const Store = require("./models/store.js");
const Order = require("./models/orders.js");
const methodOverride = require("method-override");
const { render } = require("ejs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("index")
})

app.get("/orders", async (req, res) => {
  const allorders = await Order.find({})
  res.render("allorders", {allorders})
})

app.get("/allorders", async (req, res) => {
  const allorders = await Order.find({})
  res.render("allorders", {allorders})
})

app.get("/store/:id/order/new", async (req, res) => {
  const {id}  = req.params
  const store = await Store.findById(id)
  res.render("neworder", {store})
})

app.post("/store/:id/order", async (req, res) => {
  const {id} = req.params
  const {fullName, itemsString, price, instruction} = req.body
  const items = itemsString.split(",")
  const data = {
    fullName: fullName,
    items: items,
    price: price,
    instruction: instruction
  }
  const newOrder = new Order(data)
  const store = await Store.findById(id)
  store.orders.push(newOrder)
  newOrder.store = store
  await store.save() 
  await newOrder.save()
  res.redirect(`/store/${id}`)
})

app.get("/order/:id", async (req, res) => {
  const{ id } = req.params
  const orderFound = await Order.findById(id).populate("store")
  res.render("showorder", {orderFound})
})

app.get("/order/:id/edit", async (req, res) => {
  const { id } = req.params;
  const updateOrder = await Order.findById(id)
  res.render("updateorder", {updateOrder})
})

app.put("/order/:id/edit", async (req, res) => {
  const { id } = req.params
  const {fullName, items, price, instruction} = req.body
  const updateOrder = {
    fullName: fullName,
    items: items,
    price: price,
    instruction: instruction
  }
  const orderFound = await Order.findByIdAndUpdate(id, updateOrder, {runValidators: true})
  res.redirect(`/order/${orderFound._id}`) 
})

app.get("/order/:id/delete", async (req, res) => {
  const { id } = req.params
  const deleteOrder = await Order.findById(id)
  res.render("deleteorder", {deleteOrder})
})

app.delete ("/order/:id/delete", async (req, res) => {
  const { id } = req.params
  await Order.findByIdAndDelete(id)
  res.redirect("/allorders")
})

app.get("/allstores", async (req, res) => {
  const allstores = await Store.find({})
  res.render("allstores", {allstores})
})

app.get("/newstore", (req, res) => {
  res.render("newstore")
})

app.post("/newstore", async (req, res) => {
  const {name, location, email} = req.body
  const data = {
    name: name,
    location: location,
    email: email,
  }

  const newStore = new Store(data)
  await newStore.save()
  res.redirect("/allstores")
})

app.get("/store/:id", async (req, res) => {
  const { id } = req.params
  const store = await Store.findById(id).populate("orders")
  res.render("showstore", {store})
})

app.get("/store/:id/edit", async (req, res) => {
  const { id } = req.params;
  const updateStore = await Store.findById(id)
  res.render("updatestore", {updateStore})
})

app.put("/store/:id/edit", async (req, res) => {
  const { id } = req.params
  const {name, location, email} = req.body
  const updateStore = {
    name: name,
    location: location,
    email: email,
  }
  const storeFound = await Store.findByIdAndUpdate(id, updateStore, {runValidators: true})
  res.redirect(`/store/${storeFound._id}`) 
})

app.get("/store/:id/delete", async (req, res) => {
  const { id } = req.params
  const deleteStore = await Store.findById(id)
  res.render("deletestore", {deleteStore})
})

app.delete ("/store/:id/delete", async (req, res) => {
  const { id } = req.params
  await Store.findByIdAndDelete(id)
  res.redirect("/allstores")
})


app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
