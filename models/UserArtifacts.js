const mongoose = require("mongoose");
const { Schema } = mongoose;

const userArtifactsSchema = new Schema(
    {
        //SetRef
        //TypeRef
        //Level
        //MainStat
        //SubStats {SubStat, Value}
        //CharacterEquipedBy
        //UserID
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserArtifact", userArtifactsSchema);