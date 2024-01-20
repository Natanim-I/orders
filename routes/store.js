const express = require("express")
const router = express.Router()
const Store = require("../models/store")

router.get("/:id/order/new", async (req, res) => {
    const {id}  = req.params
    const store = await Store.findById(id)
    res.render("neworder", {store})
})
  
router.post("/:id/order", async (req, res) => {
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
  
  
router.get("/all", async (req, res) => {
    const allstores = await Store.find({})
    res.render("allstores", {allstores})
})
  
router.get("/new", (req, res) => {
    res.render("newstore")
})
  
router.post("/", async (req, res) => {
    const {name, location, email} = req.body
    const data = {
      name: name,
      location: location,
      email: email,
    }
  
    const newStore = new Store(data)
    await newStore.save()
    res.redirect("/store/all")
})
  
router.get("/:id", async (req, res) => {
    const { id } = req.params
    const store = await Store.findById(id).populate("orders")
    res.render("showstore", {store})
})
  
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const updateStore = await Store.findById(id)
    res.render("updatestore", {updateStore})
})
  
router.put("/:id/edit", async (req, res) => {
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
  
router.get("/:id/delete", async (req, res) => {
    const { id } = req.params
    const deleteStore = await Store.findById(id)
    res.render("deletestore", {deleteStore})
})
  
router.delete ("/:id/delete", async (req, res) => {
    const { id } = req.params
    await Store.findByIdAndDelete(id)
    res.redirect("/store/all")
})
  
module.exports = router