const mongoose = require("mongoose");
const {Schema} = mongoose;

const artifactSetsSchema = new Schema(
    {
        _id: {type: String, required: [true, 'Artifact Set ID is required']},
        set_name: {type: String, required: [true, 'Artifact Set Name is required']},
        set_rarity: {type: Number, required: [true, 'Artifact Set Rarity is required']},
        set_bonus: [{
            setBonusMin: Number,
            setBonusDesc: String
        }],
        set_types: [{
            type_slot: {type: mongoose.Schema.Types.ObjectId, ref: "ArtifactType"},
            set_type_name: String
        //set_type_image: String
        }]
        //set_domain:
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtifactSet", artifactSetsSchema);