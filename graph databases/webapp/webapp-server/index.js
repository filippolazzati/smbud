const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/locations", require("./routes/locations"));
app.use("/vaccines", require("./routes/vaccines"));
app.use("/tests", require("./routes/tests"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
