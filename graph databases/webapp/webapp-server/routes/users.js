const express = require('express');
const dbsession = require('../dbconn.js');

const usersRoutes = express.Router();

usersRoutes.route("/test").get((req, res) => { //Test: return 10 users
    dbsession
        .run('match (n:Person) return n limit 10')
        .then((result) => {
            let userArr = [];
            result.records.forEach((record) => {
                userArr.push(record._fields[0].properties);
            });
            res.json({users: userArr});
        })
        .catch((err) => {
            res.json({errorMsg: err});
            console.log(err);
        })
})

usersRoutes.route("/get/:userId").get((req, res) => { //Get a user from id
    dbsession
        .run(`match (n:Person {Id: "${req.params.userId}"}) return n`)
        .then((result) => {
            res.json(result.records[0]._fields[0].properties);
            //res.json(result);
        })
        .catch((err) => {
            res.json({errorMsg: err});
            console.log(err);
        })
})

module.exports = usersRoutes;