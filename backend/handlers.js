const { ObjectID } = require("bson");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const objectID = require("mongodb").objectID;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("planner");

//GET user for login
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  try {
    await client.connect();
    const result = await db.collection("users").findOne({ username: username });
    console.log(result);
    //validation
    if (!result) {
      res
        .status(404)
        .json({ status: 404, data: req.body, message: "User not found" });
      return;
    }
    if (result.password !== password) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "Password does not match username.",
      });
    }
    res.status(200).json({ status: 200, data: null, message: "success" });
  } catch (err) {
    // console.log(err.message);
    res
      .status(500)
      .json({ status: 500, data: req.body, message: "Internal server error." });
  }
  client.close();
};

//GET parksList
const parksList = async (req, res) => {
  try {
    await client.connect();
    const result = await db.collection("parks").find().toArray();

    if (!result) {
      res.status(404).json({ status: 404, data: null, message: "Not found" });
      return;
    }
    res.status(200).json({ status: 200, data: result, message: "succes" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

//GET parkById
const parkByName = async (req, res) => {
  const { id } = req.params;

  //validating whether id is a string of 12 bytes or a string of 24 hex characters or an integer
  if (!ObjectID.isValid(id)) {
    res
      .status(404)
      .json({ status: 404, data: id, message: "id not in right format." });
    return;
  }

  try {
    await client.connect();
    const result = await db.collection("parks").findOne({ _id: ObjectId(id) });
    // console.log("result", result);
    if (!result) {
      res
        .status(404)
        .json({ status: 404, data: id, message: `Cannot find park.` });
      return;
    }
    res.status(200).json({ status: 200, data: result, message: "success" });
  } catch (error) {
    console.log(error.message);
  }
  client.close();
};

//GET user's trips
// const getUserTrips = async (req, res) => {
//   console.log("inside");
//   const { id } = req.params;

//   if (!ObjectID.isValid(id)) {
//     res
//       .status(404)
//       .json({ status: 404, data: id, message: "id not in right format." });
//     return;
//   }

//   try {
//     await client.connect();
//     const user = await db.collection("users").findOne({}, { trips: 1 });
//     console.log("user", user);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

module.exports = { getUserByUsername, parksList, parkByName };
