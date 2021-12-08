const express = require("express");

const certficateRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

certficateRoutes.route("/getById/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id)} ;
  db_connect
      .collection("certificates")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

certficateRoutes.route("/getByCode/:code").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { code: req.params.code};
  db_connect
      .collection("certificates")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

certficateRoutes.route("/getCertificates/:limit").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = {}
  let projection = {code: 1, owner: 1};
  db_connect.collection("certificates").find(myquery).project(projection).limit(parseInt(req.params.limit)).toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

certficateRoutes.route("/updateVaccine").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { code: req.body.code};
  let vaccine = req.body.vaccine;
  vaccine.type.productionDate = new Date(vaccine.type.productionDate);
  vaccine.date = new Date(vaccine.date);
  let updateVax = {
    $push : { "vaccines" : vaccine}
  };
  db_connect.collection("certificates").updateOne(myquery, updateVax, function (err, result){
    if (err) res.status(500).json("error: "+err);
    res.status(200).json("ok");
  });
});

certficateRoutes.route("/updateTest").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { code: req.body.code};
  let test = req.body.test;
  test.date = new Date(test.date);
  let updateTest = {
    $push : { "tests" : test}
  };

  var newRecovery = false;
  var updateRecovery = {};
  db_connect
      .collection("certificates")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        let certificate = result;
        let oldTest = certificate.tests[certificate.tests.length -1 ];
        if ((oldTest.result) && (!req.body.test.result)){
          newRecovery = true;
          updateRecovery = {
            $set : { "recovered" : new Date(new Date(req.body.test.date).toISOString())}
          }
          if (newRecovery){
            db_connect.collection("certificates").updateOne(myquery, updateRecovery, function (err2, result) {
              if (err2) throw err2;
              console.log("addedrecovery!");
            } );
          }    
        }
      });
  db_connect.collection("certificates").updateOne(myquery, updateTest, function (err, result){
    if (err) res.status(500).json("error: "+err);
    res.status(200).json("ok");
  });
});

module.exports = certficateRoutes;