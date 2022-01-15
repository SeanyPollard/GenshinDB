const mongoose = require("mongoose");
const {Schema} = mongoose;

const userArtifactsSchema = new Schema(
    {
        set_id: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactSet"},
        type_id: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactType"},
        stat_main_id: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactStat"},
        stats_sub: [{
            stat_id: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactStat"},
            rolls: [Number]
        }],
        level: {type: number, default: 1, min: 1, max: 20},
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserArtifact", userArtifactsSchema);