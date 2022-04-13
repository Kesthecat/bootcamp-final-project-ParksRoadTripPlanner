const express = require("express");
const morgan = require("morgan");
const {
  getUserByUsername,
  parksList,
  parkByName,
  getUserTrips,
  postParkReview,
  getParkReviews,
  postNewTrip,
  getTripById,
  getUser,
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
  .get("/user/:id", getUser)
  .get("/parks", parksList)
  .get("/parks/:id", parkByName)
  .get("/trip/:id", getTripById)
  .get("/reviews/:id", getParkReviews)
  .get("/trips/user/:user", getUserTrips)

  .post("/user/:username", getUserByUsername)
  .post("/review", postParkReview)
  .post("/trip", postNewTrip)
  // -------------------------------------------------------------------------

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
