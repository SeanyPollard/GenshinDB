const mongoose = require("mongoose");
const { Schema } = mongoose;

const artifactTypesSchema = new Schema(
    {
        typeRef: { type: String, required: [true, 'Artifact Type is required'] },
        //typeName
        //typeMainStats {array of attributed ids}
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtfactType", artifactTypesSchema);