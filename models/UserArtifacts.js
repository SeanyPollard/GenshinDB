const mongoose = require("mongoose");
const {Schema} = mongoose;

const userArtifactsSchema = new Schema(
    {
        set_id: {type: String, ref: "ArtifactSet"},
        type_id: {type: String, ref: "ArtifactType"},
        stat_main_id: {type: String, ref: "ArtifactStat"},
        stats_sub: [{
            stat_id: {type: String, ref: "ArtifactStat"},
            value: String
            // rolls: [Number]
        }],
        rarity: {type: Number, min: 1, max: 5},
        level: {type: Number, default: 0, min: 0, max: 20},
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserArtifacts", userArtifactsSchema, "UserArtifacts");