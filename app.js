//modules & models
require("dotenv").config();
const { PORT, MONGODB_URI } = process.env;
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/Users");
const ArtifactTypes = require("./models/ArtifactTypes")

//controllers
const homeController = require("./controllers/home");
const artifactEvalutionController = require("./controllers/artifact-evaluation");
// const homeController = require("./controllers/home");
// const userController = require("./controllers/user");
// const tastingApiController = require("./controllers/api/tasting");
// const savedTastingApiController = require("./controllers/api/savedTasting");
// const savedTastingController = require("./controllers/savedTasting");

const app = express();
app.set("view engine", "ejs");

//db connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
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

app.get("/artifact-evaluation", artifactEvalutionController.list);


// app.get("/logout", async (req, res) => {
//   req.session.destroy();
//   global.user = false;
//   res.redirect('/');
// })

// app.get("/create-taster", authMiddleware, (req, res) => {
//   res.render("create-taster", { errors: {} });
// });

// app.post("/create-taster", tasterController.create);

// app.get("/tasters", tasterController.list);
// app.get("/tasters/delete/:id", tasterController.delete);
// app.get("/tasters/update/:id", tasterController.edit);
// app.post("/tasters/update/:id", tasterController.update);



// app.get("/create-tasting", tastingController.createView);
// app.post("/create-tasting", tastingController.create);
// app.get("/update-tasting/:id", tastingController.edit);

// app.get("/search-tastings",(req,res) => {
//   res.render('search-tastings', tastingApiController);
// });

// app.get("/saved-tastings", savedTastingController.list);

// app.get("/api/search-tastings", tastingApiController.list);
// app.post("/api/saved-tasting", savedTastingApiController.create);



// app.get("/tastings", tastingController.list);
// app.get("/tastings/delete/:id", tastingController.delete);

// app.get("api/tasting", )

// app.get("/join", (req, res) => {
//   res.render('create-user', { errors: {} })
// });

// app.post("/join", userController.create);
// app.get("/login", (req, res) => {
//   res.render('login-user', { errors: {} })
// });
// app.post("/login", userController.login);


app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
  );
});