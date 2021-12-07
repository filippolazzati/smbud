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

module.exports = certficateRoutes;