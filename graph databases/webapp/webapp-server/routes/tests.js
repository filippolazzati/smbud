const express = require("express");
const dbsession = require("../dbconn.js");

const testsRoutes = express.Router();

//book a new test for a Person
testsRoutes.route("/newTest/").post((req, res) => {
  dbsession
    .run(
      `match(p:Person)
where id(p)=${req.body.userId}
create (t:Test{Result:"Unknown", Time:date("${req.body.date}")})
<-[:TAKES]-(p)`
    )
    .then(() => {
      //the post went succesfully
      res.status(200).json("OK");
    })
    .catch(() => {
      res.status(500).json("ERROR");
    });
});

//change date test of a Person
testsRoutes.route("/changeTest").post((req, res) => {
  dbsession
    .run(
      `MATCH (p:Person)-[takes:TAKES]->(t:Test)
WHERE id(p)=${req.body.userId} and t.Result = "Unknown"
SET t.Time=datetime("${req.body.date}T18:40:32.142+0100")`
    )
    .then(() => {
      //the post went succesfully
      res.status(200).json("OK");
    })
    .catch((err) => {
      res.status(500).json({ errorMsg: err });
    });
});

module.exports = testsRoutes;