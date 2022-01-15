const mongoose = require("mongoose");
const {Schema} = mongoose;

const charactersSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Character ID is required']},
        character_name: String,
        //character_element: ,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Character", charactersSchema);