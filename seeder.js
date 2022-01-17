//constants
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI, MONGODB_PROD_URI } = process.env;
const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB_PROD_URI : MONGODB_URI);

//main function
async function main() {
  try {
    //connect to db and check for exisiting collections
    await client.connect();
    const db = client.db();
    const collections = await db.listCollections( {},{nameOnly: true});
        
    //drop db if any collections found
    if (collections) {
      await db.dropDatabase();
    }

    //loading indicator in terminal
    console.log("Establishing Genshin Impact Database");

    //import the constants data into the database
    var dataToLoad = await fs.readFile(path.join(__dirname, "data/ArtifactStatsMainValues.json"), "utf8");
    await db.collection("ArtifactStatsMainValues").insertMany(JSON.parse(dataToLoad));

    dataToLoad = await fs.readFile(path.join(__dirname, "data/ArtifactStatsSubValues.json"), "utf8");
    await db.collection("ArtifactStatsSubValues").insertMany(JSON.parse(dataToLoad));

    dataToLoad = await fs.readFile(path.join(__dirname, "data/ArtifactStats.json"), "utf8");
    await db.collection("ArtifactStats").insertMany(JSON.parse(dataToLoad));

    dataToLoad = await fs.readFile(path.join(__dirname, "data/ArtifactTypes.json"), "utf8");
    await db.collection("ArtifactTypes").insertMany(JSON.parse(dataToLoad));

    dataToLoad = await fs.readFile(path.join(__dirname, "data/ArtifactSets.json"), "utf8");
    await db.collection("ArtifactSets").insertMany(JSON.parse(dataToLoad));

    dataToLoad = await fs.readFile(path.join(__dirname, "data/Characters.json"), "utf8");
    await db.collection("Characters").insertMany(JSON.parse(dataToLoad));
 
    //initialise collections for user data
    await db.createCollection("Users");
    await db.createCollection("UserArtifacts");

    //use info from characters to create aggregate collections for sorting by vision & weapon
    await db.collection("Characters").aggregate([
      { $unwind: "$vision"},
      { $group: { _id: "$vision" } },
      { $project: { name: "$_id", "_id": 0 } },
      { $out: "Visions" }
    ]).toArray();

    await db.collection("Characters").aggregate([
      { $unwind: "$weapon"},
      { $group: { _id: "$weapon" } },
      { $project: { name: "$_id", "_id": 0 } },
      { $out: "Weapons" }
    ]).toArray()

    console.log("Genshin Impact Database set up!");

    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
