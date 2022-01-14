const mongoose = require("mongoose");
const { Schema } = mongoose;

const artifactMainStatValuesSchema = new Schema(
    {
        //artifactMainStatValueRef
        //artifactMainStatValues: {Level,
        //  Value}
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtfactMainStatValues", artifactMainStatValuesSchema);