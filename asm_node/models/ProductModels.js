const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const ProductSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    old_price: { type: Number, require: true },
    new_price: { type: Number, require: true },
    product_type: { type: Number, require: true },
    image: { type: String, require: true },
});

module.exports = mongoose.model('product', ProductSchema)