const mongoose = require("mongoose");
const { Schema } = mongoose;

const userCharactersSchema = new Schema(
    {
        //CharacterRef
        //Artifacts {FlowerID, PlumeID, SandsID, GobletID, CircletID}
        //UserID
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserCharacter", userCharactersSchema);