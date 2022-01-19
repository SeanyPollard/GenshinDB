const mongoose = require("mongoose");
const {Schema} = mongoose;

const charactersSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Character ID is required']},
        name: String,
        rarity: Number,
        weapon: String,
        vision: [String]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Characters", charactersSchema, "Characters");