const mongoose = require("mongoose");
const {Schema} = mongoose;

const artifactTypesSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Artifact Type ID is required']},
        type_name: String,
        type_stats_main: [{
            stat_id: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactStat"}
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtifactType", artifactTypesSchema);