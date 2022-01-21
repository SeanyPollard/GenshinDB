const ArtifactStatsMainValues = require("../../models/ArtifactStatsMainValues");

exports.list = async (req,res) => {
    
    const mStatValueID = req.query.id;
    const mStatRarity = req.query.rarity;
    const mStatLevel = req.query.lvl;

    if (!mStatValueID || !mStatRarity || !mStatLevel) {
        res.json([]);
    }
    try {
        const Doc = await ArtifactStatsMainValues.findOne({_id: mStatValueID});
        const ValArray = Doc.artifact_stats_main_values
        var x 
        var y=[]
        for (x=0; x < ValArray.length; x++) {
            if (ValArray[x].rarity == mStatRarity) {
                y = ValArray[x].values
            }
        }
        res.json(y[mStatLevel]);
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "could not find main stat values"
        });
    }

}