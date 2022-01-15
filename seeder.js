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
    const collections = await db.listCollections({nameOnly: True});
    
    //drop any collections found
    if (collections) {
      collections.forEach(async function(col) {
        db.collection(col).drop;
      } )
    }

    //loading indicator in terminal
    const load = loading("Establishing Genshin Impact Database").start();

    //import the JSON data into the database
    //import constants first, then user data!!
    //data = await... mainvalues, subvalues, stats, types, sets, characters,
    const data = await fs.readFile(path.join(__dirname, "data/UserArtifacts.json"), "utf8");
    await db.collection("UserArtifacts").insertMany(JSON.parse(data));

    /**
     * This perhaps appears a little more complex than it is. Below, we are
     * grouping the wine tasters and summing their total tastings. Finally,
     * we tidy up the output so it represents the format we need for our new collection
     */

    const wineTastersRef = await db.collection("tastings").aggregate([
      { $match: { taster_name: { $ne: null } } },
      {
        $group: {
          _id: "$taster_name",
          twitter: { $first: "$taster_twitter_handle" },
          tastings: { $sum: 1 },
        },

      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          twitter: '$twitter',
          tastings: '$tastings'
        },
      },
    ]);
    /**
     * Below, we output the results of our aggregate into a
     * new collection
     */
    const wineTasters = await wineTastersRef.toArray();
    await db.collection("tasters").insertMany(wineTasters);

    /** This data manipulation is to reference each document in the
     * tastings collection to a taster id. Further to this we also take the opportunity to
     * tidy up points (converting it to a int) and regions, adding them to a an array
     */

    const updatedWineTastersRef = db.collection("tasters").find({});
    const updatedWineTasters = await updatedWineTastersRef.toArray();
    updatedWineTasters.forEach(async ({ _id, name }) => {
      await db.collection("tastings").updateMany({ taster_name: name }, [
        {
          $set: {
            taster_id: _id,
            regions: ["$region_1", "$region_2"],
            points: { $toInt: "$points" },
          },
        },
      ]);
    });


    /**
     * we can get rid of region_1/2 off our root document, since we've
     * placed them in an array
     */
    await db
      .collection("tastings")
      .updateMany({}, { $unset: { region_1: "", region_2: " " } });

    /**
     * Finally, we remove nulls regions from our collection of arrays
     * */
    await db
      .collection("tastings")
      .updateMany({ regions: { $all: [null] } }, [
        { $set: { regions: [{ $arrayElemAt: ["$regions", 0] }] } },
      ])


    db.collection("tastings").aggregate([
      { $group: { _id: "$variety" } },
      { $project: { name: "$_id", "_id": 0 } },
      { $out: "varieties" }
    ]).toArray();

    db.collection("tastings").aggregate([
      { $group: { _id: "$country" } },
      { $project: { name: "$_id", "_id": 0 } },
      { $out: "countries" }
    ]).toArray()



    await db.collection("tastings").aggregate([
      { $group: { _id: "$province" } },
      { $project: { name: "$_id", "_id": 0 } },
      { $out: "provinces" }
    ]).toArray()

    await db.collection("tastings").aggregate([
      { $unwind: "$regions" },
      { $group: { _id: "$regions" } },
      { $project: { name: '$_id', _id: 0 } },
      { $out: "regions" }
    ]).toArray();


    await db.collection("tastings").aggregate([
      { $unwind: "$regions" },
      { $group: { _id: "$regions" } },
      { $project: { name: "$_id", "_id": 0 } },
      { $out: "regions" }
    ]).toArray()



    load.stop();
    console.info(
      `Wine collection set up! 🍷🍷🍷🍷🍷🍷🍷 \n I've also created a tasters collection for you 🥴 🥴 🥴`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
