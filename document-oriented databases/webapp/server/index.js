const express = require('express');
const app = express();
const path = require("path");

const cors = require('cors');

require('dotenv').config({path: './config.env'});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/certificates", require("./routes/certificates"));
app.use("/locations", require("./routes/locations"));

const dbo = require('./db/conn');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) console.err(err); 
    });
    console.log(`Server started on port ${port}`);
})