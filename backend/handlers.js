const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//had to create several clients in order to not loose connection since several fetch is always happening in the sametime.
const client = new MongoClient(MONGO_URI, options);
const db = client.db("planner");

const client2 = new MongoClient(MONGO_URI, options);
const db2 = client2.db("planner");

const client3 = new MongoClient(MONGO_URI, options);
const db3 = client3.db("planner");

const client4 = new MongoClient(MONGO_URI, options);
const db4 = client4.db("planner");

const client5 = new MongoClient(MONGO_URI, options);
const db5 = client5.db("planner");

//POST user for login/////////////////////////////////
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  try {
    await client.connect();
    const result = await db.collection("users").findOne({ username: username });
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
    res.status(200).json({ status: 200, data: result, message: "success" });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: "Internal server error." });
  }
  client.close();
};

//GET user by id//////////////////////
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    await client3.connect();
    const result = await db3.collection("users").findOne({ _id: ObjectId(id) });
    if (!result) {
      res
        .status(404)
        .json({ status: 404, data: id, message: `Cannot find user.` });
      return;
    }
    res.status(200).json({ status: 200, data: result, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

//GET parksList and origin list///////////////////////
const parksList = async (req, res) => {
  try {
    await client2.connect();
    const parksResult = await db2.collection("parks").find().toArray();
    const originResult = await db2.collection("parksOrigin").findOne({});

    if (!parksResult) {
      res
        .status(404)
        .json({ status: 404, data: null, message: "Cannot find Parks List." });
      return;
    }

    if (!originResult) {
      res
        .status(404)
        .json({ status: 404, data: null, message: "Cannot find origin List." });
      return;
    }
    const listParksOrigins = { parks: parksResult, origin: originResult };
    res
      .status(200)
      .json({ status: 200, data: listParksOrigins, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

//GET parkById/////////////////////////////////////////
const parkByName = async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const result = await db.collection("parks").findOne({ _id: ObjectId(id) });
    if (!result) {
      res
        .status(404)
        .json({ status: 404, data: id, message: `Cannot find park.` });
      return;
    }
    res.status(200).json({ status: 200, data: result, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client2.close();
};

//GET user's trips//////////////////////////////////////////
const getUserTrips = async (req, res) => {
  const { user } = req.params;

  try {
    await client4.connect();
    const result = await db4
      .collection("trips")
      .find({ userId: user })
      .toArray();
    if (!result) {
      res
        .status(404)
        .json({ status: 404, data: user, message: "Cannot find trips." });
      return;
    }
    res.status(200).json({ status: 200, data: result, message: "success" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

//GET trip by tripId//////////////////////////////////////
const getTripById = async (req, res) => {
  const { id } = req.params;

  try {
    await client5.connect();
    const result = await db5.collection("trips").findOne({ _id: ObjectId(id) });
    if (!result) {
      res
        .status(404)
        .json({ status: 404, data: id, message: `Cannot find park.` });
      return;
    }
    res.status(200).json({ status: 200, data: result, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

//POST trip//////////////////////////////////////////////
const postNewTrip = async (req, res) => {
  const { departure, destination, waypoints, tripName, userId, time } =
    req.body;

  //validating no missing inputs
  if (
    !departure ||
    !destination ||
    !waypoints ||
    !tripName ||
    !userId ||
    !time
  ) {
    return res
      .status(400)
      .json({ status: 400, data: req.body, mesage: "Missing info" });
  }

  try {
    //make sure the user exist in database
    await client.connect();
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, data: req.body, message: "User not found." });
    }
    ///////add the trip to trip collection
    const result = await db.collection("trips").insertOne(req.body);
    if (!result.acknowledged) {
      return res
        .status(502)
        .json({ status: 502, data: req.body, message: "Cannot add review." });
    }
    res.status(200).json({ status: 200, data: req.body, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

//POST review////////////////////////////////////////////
const postParkReview = async (req, res) => {
  const { user, review, time, parkId } = req.body;

  if (!user || !review || !time || !parkId) {
    return res
      .status(400)
      .json({ status: 400, data: req.body, message: "Info missing" });
  }

  try {
    await client.connect();
    const result = await db.collection("reviews").insertOne(req.body);
    if (!result.acknowledged) {
      return res
        .status(502)
        .json({ status: 502, data: req.body, message: "Cannot add review." });
    }
    res.status(200).json({ status: 200, data: req.body, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

////GET reviews/////////////////////////////////////////////
const getParkReviews = async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const result = await db
      .collection("reviews")
      .find({ parkId: id })
      .toArray();
    if (!result) {
      return res.status(404).json({
        status: 404,
        data: id,
        message: `Cannot find reviews according to park's id.`,
      });
    }
    if (result.length === 0) {
      return res
        .status(200)
        .json({ status: 200, data: null, message: "success" });
    }
    res.status(200).json({ status: 200, data: result, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

//DELLETE trip ////////////////////////////
const deleteTripById = async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    //validate that the trip exist
    const existence = await db
      .collection("trips")
      .findOne({ _id: ObjectId(id) });
    if (!existence) {
      return res.status(404).json({
        status: 404,
        data: id,
        message: `Cannot find trip according to trip id.`,
      });
    }
    const result = await db
      .collection("trips")
      .deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(400).json({
        status: 400,
        data: id,
        message: "Unable to delete trip. Please contact customer services.",
      });
    }
    res.status(200).json({ status: 200, data: null, message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: null, message: "Internal server error" });
  }
  client.close();
};

module.exports = {
  getUserByUsername,
  getUser,
  parksList,
  parkByName,
  postParkReview,
  getParkReviews,
  postNewTrip,
  getTripById,
  getUserTrips,
  deleteTripById,
};
