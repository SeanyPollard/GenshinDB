const ArtifactSet = require('../models/ArtifactSets');
const ArtifactType = require('../models/ArtifactTypes');
const ArtifactStat = require('../models/ArtifactStats');
const ArtifactStatsMainValues = require('../models/ArtifactStatsMainValues');
const ArtifactStatsSubValues = require('../models/ArtifactStatsSubValues')
// const Users = require('../models/Users');
// const Artifacts = require('../models/UserArtifacts')

//DO SET FIRST COZ TIARAS
exports.list = async (req, res) => {
    console.log(req.session);
    try {
        const artifactStatsMainValues = await ArtifactStatsMainValues.find({});
        const statsValues = artifactStatsMainValues[0].artifact_stats_main_values;
        var rarities = []
        var rars, lvls
        for(rars = 0; rars < statsValues.length; rars++) {
            r = statsValues[rars].rarity;
            ml = statsValues[rars].values.length - 1;
            rarities.push({rarity: r,max_level: ml});
        }
        
        const artifactSets = await ArtifactSet.find({});
        var sets = []
        var s, sname, sid, sr, srars
        for(s = 0; s < artifactSets.length; s++) {
            sname = artifactSets[s].set_name;
            sid = artifactSets[s]._id;
            srars = ""
            for(sr = 0; sr < artifactSets[s].set_rarity.length; sr++) {
                if (sr < artifactSets[s].set_rarity.length - 1) {
                    srars += artifactSets[s].set_rarity[sr]+",";
                } else {
                    srars += artifactSets[s].set_rarity[sr];
                }
            }
            sets.push({name: sname, id: sid, rarities: srars})
        }

        const artifactTypes = await ArtifactType.find({});
        var types = []
        var t, tname, ts, tstats
        for(t = 0; t < artifactTypes.length; t++) {
            tname = artifactTypes[t]._id;
            tstats = ""
            for(ts = 0; ts < artifactTypes[t].type_stats_main.length; ts++) {
                if (ts < artifactTypes[t].type_stats_main.length - 1) {
                    tstats += artifactTypes[t].type_stats_main[ts]+",";
                } else {
                    tstats += artifactTypes[t].type_stats_main[ts];
                }
            }
            types.push({name: tname, stats: tstats})
        }

        const artifactStats = await ArtifactStat.find({});
        var mStats = []
        var sStats = []
        var as, asname, asid, smv, ssv
        for(as = 0; as < artifactStats.length; as++) {
            asname = artifactStats[as].stat_name;
            asid = artifactStats[as]._id;
            if (artifactStats[as].stat_main_values_id != "") {
                smv = artifactStats[as].stat_main_values_id
                mStats.push({name: asname, id: asid, vid: smv})
            }
            if (artifactStats[as].stat_sub_values_id != "") {
                ssv = artifactStats[as].stat_sub_values_id
                sStats.push({name: asname, id: asid, vid: ssv})
            }

        }
        // const artifactStatsSubValues = await ArtifactStatsSubValues.find({});
        res.render("artifact-evaluation", { rarities: rarities, sets: sets, types: types, mStats: mStats, sStats: sStats});
    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}