const ArtifactSet = require('../models/ArtifactSets');
const ArtifactType = require('../models/ArtifactTypes');
const ArtifactStat = require('../models/ArtifactStats');
const ArtifactStatsMainValues = require('../models/ArtifactStatsMainValues');
// const ArtifactStatsSubValues = require('../models/ArtifactStatsSubValues')
const User = require('../models/User');
const Artifact = require('../models/UserArtifacts')

exports.list = async (req, res) => {
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
};

exports.create = async (req, res) => {
    try {
        const userArtifact = new Artifact ({
           set_id: req.body.set,
           type_id: req.body.type,
           stat_main_id: req.body.main,
           stats_sub: [{
               stat_id: req.body.sub1,
               value: req.body.subv1
            }, { 
                stat_id: req.body.sub2,
                value: req.body.subv2
            }, {
                stat_id: req.body.sub3,
                value: req.body.subv3
            }, {
                stat_id: req.body.sub4,
                value: req.body.subv4
            }],
            rarity: req.body.rarity,
            level: req.body.level

        });

        const arti = await userArtifact.save() 
        console.log(arti._id)
        const artifactID = arti._id
        await User.updateOne({_id: global.user}, {$push:{user_artifacts: artifactID}})
        res.redirect('/my-artifacts')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-taster', { errors: e.errors })
            return;
          }
          return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}