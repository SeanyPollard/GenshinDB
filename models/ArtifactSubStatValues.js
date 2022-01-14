const mongoose = require("mongoose");
const { Schema } = mongoose;

const artifactSubtatValuesSchema = new Schema(
    {
        //artifactSubStatValueRef
        //artifactSubStatValues: {Roll,
        //  Value}
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtfactSubStatValues", rtifactSubtatValuesSchema);