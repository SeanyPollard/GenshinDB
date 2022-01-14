const mongoose = require("mongoose");
const { Schema } = mongoose;

const artifactSetsSchema = new Schema(
    {
        //setRef
        setName: { type: String, required: [true, 'Artifact Set is required'] },
        //setRarity??
        //setBonus: {setEquipMin: {type: Number, required: [true, 'Artifact Set Bonus A Minimum is required']},
        //  setBonusDesc: { type: String, required: [true, 'Artifact Set Bonus A Description is required']}}
        //setTypes: {typeSlot: {},
        //  setTypeName: {},
        //  setTypeImage: {}}
    },
    { timestamps: true }
);

module.exports = mongoose.model("ArtfactSet", artifactSetsSchema);