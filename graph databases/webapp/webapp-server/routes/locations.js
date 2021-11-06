const express = require("express");
const dbsession = require("../dbconn.js");

const locationRoutes = express.Router();

//get all location by the description searched by a user
locationRoutes
  .route("/getLocationByDescription/:description")
  .get((req, res) => {
    var locationList = [];

    dbsession
      .run(
        `match (l:Location {Description: "${req.params.description}"}) return l`
      )
      .subscribe({
        onNext: (record) => {
          locationList.push(record.get("l").properties);
        },
        onCompleted: function () {
          console.log("Operation completed!");

          //send the response
          res.json({
            locations: locationList,
          });
        },
        onError: function (error) {
          console.log("Error occurred: " + error);
        },
      });
  });

//get all location by the address searched by a user
locationRoutes.route("/getLocationByAddress/:address").get((req, res) => {
  var location = [];

  dbsession
    .run(`match (l:Location {Address: "${req.params.address}"}) return l`)
    .subscribe({
      onNext: (record) => {
        location.push(record.get("l").properties);
      },
      onCompleted: function () {
        console.log("Operation completed!");

        //send the response
        res.json({
          location: location,
        });
      },
      onError: function (error) {
        console.log("Error occurred: " + error);
      },
    });
});

module.exports = locationRoutes;
