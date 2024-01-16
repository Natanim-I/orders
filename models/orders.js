const mongoose = require("mongoose");
const { Schema } = mongoose

const ordersSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instruction: {
    type: String,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  }
});

const Order = mongoose.model("Order", ordersSchema);
module.exports = Order;
