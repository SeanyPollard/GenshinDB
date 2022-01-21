const ArtifactStats = require("../../models/ArtifactStats");
const ArtifactTypes = require("../../models/ArtifactTypes")

exports.list = async (req,res) => {
    
    const typeID = req.query.type;

    if (!typeID) {
        res.json([]);
    }
    try {
        const tDoc = await ArtifactTypes.findOne({_id: typeID});
        const ValArray = tDoc.type_stats_main
        var x 
        var y=[]
        for (x=0; x < ValArray.length; x++) {
            const statDoc = await ArtifactStats.findOne({_id: ValArray[x]})
            y.push(statDoc)
            }
        res.json(y);
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "could not find main stat values"
        });
    }

}