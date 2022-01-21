const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {type: String, required: [true, 'Name is required']},
        email: {type: String, required: [true, 'Email is required'], unique: true},
        password: {type: String, required: [true, 'Password is required']},
        user_artifacts: [{type: mongoose.Schema.Types.ObjectId, ref: "UserArtifacts"}]
        // user_artifacts: [{
        //     artifact_id: {type: mongoose.Schema.Types.ObjectId, ref: "UserArtifact"},
        //     character_id: {type: mongoose.Schema.Types.ObjectId, ref: "Character"}
        // }], 
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    console.log(this.password);
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('could not hash password');
    }
})

module.exports = mongoose.model("Users", userSchema, "Users");
