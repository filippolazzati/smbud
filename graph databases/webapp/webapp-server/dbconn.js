const neo4j = require('neo4j-driver');
require('dotenv').config({path: './config.env'});

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO_USER, process.env.NEO_PASSWORD));

const session = driver.session();

module.exports = session;