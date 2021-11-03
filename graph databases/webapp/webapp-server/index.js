const express = require('express');
const app = express();

const cors = require('cors');

require('dotenv').config({path: './config.env'});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})