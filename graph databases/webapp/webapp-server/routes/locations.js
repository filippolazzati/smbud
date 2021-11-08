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
          locationList.push({
            id: record.get("l").identity.low,
            address: record.get("l").properties.Address,
            description: record.get("l").properties.Description,
          });
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
        location.push({
          id: record.get("l").identity.low,
          address: record.get("l").properties.Address,
          description: record.get("l").properties.Description,
        });
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

locationRoutes.route("/getLocationById/:id").get((req, res) => {
  var location = {};

  dbsession
    .run(`match (l:Location) where id(l)=${req.params.id} return l`)
    .subscribe({
      onNext: (record) => {
        location = {
          id: record.get("l").identity.low,
          address: record.get("l").properties.Address,
          description: record.get("l").properties.Description,
        };
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

  dbsession
    .run("match (l:Location) return distinct l.Description")
    .then((result) => {
      result.records.forEach((record) => {
        descriptions.push(record._fields[0]);
      });
      res.json({ descriptions: descriptions });
    })
    .catch((err) => {
      res.json({ errorMsg: err });
      console.log(err);
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
        visitors.push({
          id: record.get("p").identity.low,
          properties: record.get("p").properties,
        });
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
