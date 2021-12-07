const express = require("express");

const locationRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

locationRoutes.route("/getLocations/:limit").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = {}
  db_connect.collection("locations").find(myquery).limit(parseInt(req.params.limit)).toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

locationRoutes.route("/getById/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = {_id: req.params.id}
  db_connect.collection("locations").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

locationRoutes.route("/getVaccinations/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let unwind = {
    path: '$vaccines',
    includeArrayIndex: 'string',
    preserveNullAndEmptyArrays: false
  };
  let sort = {
    count: -1
  }
  let group = {
    _id: '$vaccines.locationId',
    count: {
      $sum: 1
    }
  }
  let match = {
    'vaccines.locationId': req.params.id
  }
  let pipeline = [
    {$unwind: unwind},
    {$match: match},
    {$group: group},
    {$sort: sort}
  ];
  db_connect.collection("certificates").aggregate(pipeline).toArray((err, result) => {
    if(err) throw err;
    res.json(result[0]);
  });
});

locationRoutes.route("/getTests/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let unwind = {
    path: '$tests',
    includeArrayIndex: 'string',
    preserveNullAndEmptyArrays: false
  };
  let sort = {
    count: -1
  }
  let group = {
    _id: '$tests.locationId',
    count: {
      $sum: 1
    }
  }
  let match = {
    'tests.locationId': req.params.id
  }
  let pipeline = [
    {$unwind: unwind},
    {$match: match},
    {$group: group},
    {$sort: sort}
  ];
  db_connect.collection("certificates").aggregate(pipeline).toArray((err, result) => {
    if(err) throw err;
    res.json(result[0]);
  });
});

module.exports = locationRoutes;