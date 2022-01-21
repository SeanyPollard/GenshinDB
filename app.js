//modules & models
require("dotenv").config();
const { PORT, MONGODB_URI, MONGODB_PROD_URI } = process.env;
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");

//controllers
const homeController = require("./controllers/home");
const artifactEvaluationController = require("./controllers/artifact-evaluation");
const mainStatApiController = require("./controllers/api/main-stat-update")
const setPieceNameApiController = require("./controllers/api/set-piece-name")
const mainStatButtonsController = require("./controllers/api/main-stat-buttons")
const subStatScoreController = require("./controllers/api/sub-stat-score")
const userController = require("./controllers/user");
const savedArtifactsController = require("./controllers/saved-artifacts")

const app = express();
app.set("view engine", "ejs");

//db connection
mongoose.connect(process.env.NODE_ENV === "production" ? MONGODB_PROD_URI : MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

//middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//user session auth with cookie for 30 days
app.use(expressSession({ secret: "do not tell", cookie: { maxAge: 2592000000 } }));

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

//methods from controllers
app.get("/", homeController.list);

app.get("/artifact-evaluation", artifactEvaluationController.list);

app.get("/api/main-stat-update", mainStatApiController.list);
app.get("/api/set-piece-name", setPieceNameApiController.list);
app.get("/api/main-stat-buttons", mainStatButtonsController.list);
app.get("/api/sub-stat-score", subStatScoreController.list);

app.post("/save-artifact", artifactEvaluationController.create);

app.get("/my-artifacts", savedArtifactsController.list)

app.get("/join", (req, res) => {
  res.render('create-user', { errors: {} })
});

app.post("/join", userController.create);
app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);


app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})


app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
  );
});