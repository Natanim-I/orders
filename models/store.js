const mongoose = require("mongoose")
const Order = require("./orders")
const { Schema } = mongoose

const storeSchema = new Schema({
    name: {
        type: String,
        require: [true, "Store must have a name!"]
    },
    location: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Store nust have an email!"]
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})

storeSchema.post("findOneAndDelete", async function(store){
    if(store.orders.length){
        await Order.deleteMany({_id: {$in: store.orders}})
    }
})

const Store = mongoose.model("Store", storeSchema)
module.exports = Store