const express = require('express');
const app = express();

const cors = require('cors');

require('dotenv').config({path: './config.env'});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/certificates", require("./routes/certificates"));

const dbo = require('./db/conn');

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) console.err(err); 
    });
    console.log(`Server started on port ${port}`);
})