const ArtifactSet = require('../../models/ArtifactSets');

exports.list = async (req,res) => {
    
    const setID = req.query.set;
    const typeID = req.query.type;

    if (!setID || !typeID ) {
        res.json([]);
    }
    try {
        const Doc = await ArtifactSet.findOne({_id: setID});
        const ValArray = Doc.set_types
        var x 
        var y=[]
        for (x=0; x < ValArray.length; x++) {
            if (ValArray[x].type_slot == typeID) {
                y = ValArray[x].set_type_name
            }
        }
        res.json(y);
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "could not find main stat values"
        });
    }

}