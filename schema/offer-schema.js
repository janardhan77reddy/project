const mongoose = require("mongoose");
const offerSchema = new mongoose.schema({
    offer_id: String,
    offer_title: String,
    offer_description: String,
    offer_image: String,
    offer_sort_order: Number,
    content: Array,
    schedule: Object,
    target: String,
    pricing: Array
});


const offer = mongoose.model("offer", offerSchema);
module.exports = {offer}