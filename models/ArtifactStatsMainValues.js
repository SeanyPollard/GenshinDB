const mongoose = require("mongoose");
const {Schema} = mongoose;

const artifactStatsMainValuesSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Artifact Stats Main Values ID is required']},
        artifact_stats_main_values: [{
            rarity: {type: Number, required: [true, 'Artifact Stats Main Values Array Rarity is required']},
            values: [mongoose.Decimal128]
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtifactStatsMainValues", artifactStatsMainValuesSchema);