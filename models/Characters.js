const mongoose = require("mongoose");
const {Schema} = mongoose;

const charactersSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Character ID is required']},
        character_name: String,
        character_vision: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Character", charactersSchema);