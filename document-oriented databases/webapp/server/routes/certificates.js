const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/getById/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id)} ;
  db_connect
      .collection("certificates")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

recordRoutes.route("/getByCode/:code").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { code: req.params.code};
  db_connect
      .collection("certificates")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

module.exports = recordRoutes;