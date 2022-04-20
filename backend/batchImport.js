const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const alberta = require("./data/Alberta.json");
const bc = require("./data/ BC.json");
const canada = require("./data/Canada.json");
const manitoba = require("./data/Manitoba.json");
const nl = require("./data/NL.json");
const nova = require("./data/Nova Scotia.json");
const ontario = require("./data/Ontario.json");
const pei = require("./data/PEI.json");
const saskatchewan = require("./data/Saskatchewan.json");
const sepaq = require("./data/Sepaq.json");
// const users = require("./data/users.json");
const origin = require("./data/parksOrigin.json");

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("planner");
    const result = await db.collection("parks").insertMany(ontario);
    console.log("done");
  } catch (err) {
    console.log("There was an error: ", err.message);
  }
  client.close();
};

batchImport();
