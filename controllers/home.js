const Users = require('../models/Users');
const Artifacts = require('../models/UserArtifacts')

exports.list = async (req, res) => {
    console.log(req.session);
    try {
        const totalUsers = await Users.find({}).count();
        
        const totalArtifacts = await Artifacts.find({}).count();

        res.render("index", { totalUsers: totalUsers, totalArtifacts: totalArtifacts});
    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}