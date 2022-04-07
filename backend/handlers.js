const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("planner");

//GET user for login
const getUserByUsername = async (req, res) => {
  const { username, password } = req.body;
  try {
    await client.connect();
    const result = await db.collection(users).findOne({ _id: username });

    //validation
    if (!result) {
      res
        .status(404)
        .json({ status: 404, data: req.body, message: "User not found" });
      return;
    }
    if (result.password !== password) {
      res
        .status(400)
        .json({
          status: 400,
          data: req.body,
          message: "Password does not match username.",
        });
    }
    res.status(200).json({ status: 200, data: null, message: "success" });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ status: 500, data: req.body, message: "Internal server error." });
  }
  client.close();
};

module.exports = { getUserByUsername };
