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

//get all types of location in DB
locationRoutes.route("/getDescriptions/").get((req, res) => {
  var descriptions = [];

  dbsession.run(`match (l:Location) return distinct l.Description`).subscribe({
    onNext: (record) => {
      descriptions.push(record.get("l.Description"));
    },
    onCompleted: function () {
      console.log("Operation completed, all location's description loaded");

      res.json({
        description: descriptions,
      });
    },
    onError: function (error) {
      console.log("Error occurred: " + error);
    },
  });
});

//get all people in a location
locationRoutes.route("/getVisitors/:location/:date").get((req, res) => {
  var idLocation = req.params.location;
  var date = req.params.date.split("-");
  var year = date[0];
  var month = date[1];
  var day = date[2];

  var visitors = [];

  dbsession
    .run(
      `match (l:Location)<-[v:VISITED]-(p:Person)
where id(l)= ${idLocation} and v.StartTime.year = ${year} and v.StartTime.
month = ${month} and v.StartTime.day = ${day} return p`
    )
    .subscribe({
      onNext: (record) => {
        visitors.push(record.get("p").properties);
      },
      onCompleted: function () {
        console.log("Find all visitors of a location in a specific date");

        res.json({
          visitors: visitors,
        });
      },
      onError: function (error) {
        console.log("Error occurred: " + error);
      },
    });
});
module.exports = locationRoutes;
