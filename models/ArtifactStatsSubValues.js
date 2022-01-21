const mongoose = require("mongoose");
const {Schema} = mongoose;

const artifactStatsSubValuesSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Artifact Stats Sub Values ID is required']},
        artifact_stats_sub_values: [{
            rarity: Number,
            max_val: Number
            // values: [mongoose.Decimal128]
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtifactStatsSubValues", artifactStatsSubValuesSchema, "ArtifactStatsSubValues");