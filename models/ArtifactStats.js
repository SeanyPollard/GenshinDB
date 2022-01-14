const mongoose = require("mongoose");
const { Schema } = mongoose;

const artifactStatsSchema = new Schema(
    {
        //statRef: { type: String, required: [true, 'Artifact Main Stat is required'] },
        //statName
        //statSlot: {statType, statTypeValueRef}

    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtfactStat", artifactStatsSchema);