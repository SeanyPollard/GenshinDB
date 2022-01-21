const User = require("../models/User");
const Artifacts = require("../models/UserArtifacts")

exports.list = async (req, res) => {
    try {
      const userRef = await User.findOne({"_id": global.user}).populate('user_artifacts');
      let userArtifacts = []
      var x, y
      for (x=0; x < userRef.user_artifacts.length; x++) {
        y = await Artifacts.findOne({"_id": userRef.user_artifacts[x]}).populate()
        userArtifacts.push(y)
      }
      res.render('saved-artifacts', {artifacts: userArtifacts});
    } catch (e) {
      console.log(e);
      res.json({result: 'could not find user artifacts'}); 
    }
}