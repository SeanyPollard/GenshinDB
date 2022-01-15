const mongoose = require("mongoose");
const {Schema} = mongoose;

const artifactStatsSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Artifact Stat ID is required']},
        stat_name: String,
        stat_main_values_id: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactStatsMainValues"},
        stat_sub_values_id: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactStatsSubValues"}
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtifactStat", artifactStatsSchema);