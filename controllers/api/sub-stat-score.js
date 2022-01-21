const ArtifactStatsSubValues = require("../../models/ArtifactStatsSubValues");

exports.list = async (req,res) => {
    
    const sStatValueID = req.query.id;
    const sStatRarity = req.query.rarity;

    if (!sStatValueID || !sStatRarity) {
        res.json([]);
    }
    try {
        const Doc = await ArtifactStatsSubValues.findOne({_id: sStatValueID});
        const ValArray = Doc.artifact_stats_sub_values
        var x 
        var y=[]
        for (x=0; x < ValArray.length; x++) {
            if (ValArray[x].rarity == sStatRarity) {
                y = ValArray[x].max_val
            }
        }
        res.json(y);
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "could not find sub stat max value"
        });
    }

}