const mongoose = require("mongoose");
const {Schema} = mongoose;

const artifactStatsSubValuesSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Artifact Stats Sub Values ID is required']},
        artifact_stats_sub_values: [{
            rarity: Number,
            values: [{
                roll: Number,
                value: mongoose.Decimal128
            }]
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtfactStatsSubValues", artifactStatsSubValuesSchema);