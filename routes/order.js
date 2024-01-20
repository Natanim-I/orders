const express = require("express")
const router = express.Router()
const Order = require("../models/orders")


router.get("/", async (req, res) => {
    const allorders = await Order.find({})
    res.render("allorders", {allorders})
})
  
router.get("/all", async (req, res) => {
    const allorders = await Order.find({})
    res.render("allorders", {allorders})
})

router.get("/:id", async (req, res) => {
    const{ id } = req.params
    const orderFound = await Order.findById(id).populate("store")
    res.render("showorder", {orderFound})
})
  
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const updateOrder = await Order.findById(id)
    res.render("updateorder", {updateOrder})
})
  
router.put("/:id/edit", async (req, res) => {
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

router.get("/:id/delete", async (req, res) => {
    const { id } = req.params
    const deleteOrder = await Order.findById(id)
    res.render("deleteorder", {deleteOrder})
})
  
router.delete ("/:id/delete", async (req, res) => {
    const { id } = req.params
    await Order.findByIdAndDelete(id)
    res.redirect("/order/all")
})
  
module.exports = router