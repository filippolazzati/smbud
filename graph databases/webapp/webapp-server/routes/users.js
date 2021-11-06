const express = require("express");
const dbsession = require("../dbconn.js");

const usersRoutes = express.Router();

usersRoutes.route("/test").get((req, res) => {
  //Test: return 10 users
  dbsession
    .run("match (n:Person) return n limit 10")
    .then((result) => {
      let userArr = [];
      result.records.forEach((record) => {
        userArr.push(record._fields[0].properties);
      });
      res.json({ users: userArr });
    })
    .catch((err) => {
      res.json({ errorMsg: err });
      console.log(err);
    });
});

//search request by name and surname
usersRoutes.route("/getByName/:userName").get((req, res) => {
  var string = req.params.userName.split("_");
  var name = string[0];
  var surname = string[1];
  dbsession
    .run(`match (n:Person {Name: "${name}", Surname: "${surname}"}) return n`)
    .then((result) => {
      var usersList = [];
      result.records.forEach((record) => {
        usersList.push(record._fields[0].properties);
      });
      res.json({ users: usersList });
    })
    .catch((err) => {
      res.json({ errorMsg: err });
      console.log(err);
    });
});

/*  get user page :
//    - basic info
//    - vaccinated (y/n)
//    - test list         */
usersRoutes.route("/getById/:userId").get(async (req, res) => {
  var userId = req.params.userId;

  //get basic info about an user from his Id
  var userInfo = [];

  dbsession.run(`match (n:Person {Id: "${userId}"}) return n`).subscribe({
    onNext: (record1) => {
      userInfo.push(record1.get("n").properties);
    },
    onCompleted: function () {
      console.log("Operation 1 completed.");

      // now get the vaccine dose of an user by his Id
      var vaccineList = [];

      dbsession
        .run(
          `match (n:Person {Id: "${userId}"})-[:GETS]->(v:VaccineDose) RETURN v`
        )
        .subscribe({
          onNext: (record2) => {
            vaccineList.push(record2.get("v").properties);
          },
          onCompleted: function () {
            console.log("Operation 2 completed.");

            // now get all the tests of an user by his Id
            var testList = [];

            dbsession
              .run(
                `match (n:Person {Id: "${userId}"})-[:TAKES]->(t:Test) RETURN t`
              )
              .subscribe({
                onNext: (record3) => {
                  testList.push(record3.get("t").properties);
                },
                onCompleted: function () {
                  console.log("Operation 3 completed.");

                  // the response is ready, send to the client
                  res.json({
                    user: userInfo,
                    vaccines: vaccineList,
                    tests: testList,
                  });
                },
                onError: function (error) {
                  console.log("Error occurred in operation 3: " + error);
                  return null;
                },
              });
          },
          onError: function (error) {
            console.log("Error occurred in operation 2: " + error);
            return null;
          },
        });
    },
    onError: function (error) {
      console.log("Error occurred in operation 1: " + error);
      return null;
    },
  });
});

usersRoutes.route("/get/:userId").get((req, res) => {
  //Get a user from id
  dbsession
    .run(`match (n:Person {Id: "${req.params.userId}"}) return n`)
    .then((result) => {
      res.json(result.records[0]._fields[0].properties);
    })
    .catch((err) => {
      res.json({ errorMsg: err });
      console.log(err);
    });
});

module.exports = usersRoutes;
