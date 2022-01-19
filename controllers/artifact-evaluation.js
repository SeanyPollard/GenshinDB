const ArtifactSet = require('../models/ArtifactSets');
const ArtifactType = require('../models/ArtifactTypes');
const ArtifactStat = require('../models/ArtifactStats');
const ArtifactStatMainValues = require('../models/ArtifactStatsMainValues');
const ArtifactStatSubValues = require('../models/ArtifactStatsSubValues')
// const Users = require('../models/Users');
// const Artifacts = require('../models/UserArtifacts')

//DO SET FIRST COZ TIARAS
exports.list = async (req, res) => {
    console.log(req.session);
    try {
        const artifactSets = await ArtifactSet.find({});
        const artifactTypes = await ArtifactType.find({});
        const artifactStats = await ArtifactStat.find({});
        const artifactStatsMainValues = await ArtifactStatMainValues.find({});
        const artifactStatsSubValues = await ArtifactStatSubValues.find({});
        res.render("artifact-evaluation", { sets: artifactSets, types: artifactTypes});
    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}