const express = require("express");
const morgan = require("morgan");
const {
  getUserByUsername,
  parksList,
  parkByName,
  getUserTrips,
} = require("./handlers");

const PORT = 8000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints ----------------------------------------------------------
  .get("/parks", parksList)
  .get("/parks/:id", parkByName)
  // .get("/trips/my-trips/:id", getUserTrips)
  .post("/user/:username", getUserByUsername)

  // -------------------------------------------------------------------------

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
