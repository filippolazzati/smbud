const express = require("express");
const dbsession = require("../dbconn.js");

const vaccinesRoutes = express.Router();

vaccinesRoutes.route("/stats").get((req, res) => {
  dbsession
    .run("match(v:VaccineDose) return v.Type, count(*) as number_of_doses")
    .then((result) => {
        let vaccineStats = [];
        result.records.forEach((record) => {
            vaccineStats.push({
                name: record._fields[0],
                doses: record._fields[1].low,
            })
        })
        res.json({stats: vaccineStats});
    })
    .catch((err) => {
        res.json({ errorMsg: err });
        console.log(err);
    });
});

module.exports = vaccinesRoutes;
