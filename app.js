const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3002;
var path = require('path'); 
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

const cors = require("cors");
const rtsIndex = require("./routes/router");
app.use(cors({ origin: "http://localhost:4200" }));

app.use('/api',rtsIndex);
require("./config/connection");

app.listen(`${port}`, (req, res) => {
  console.log("listen", port);
});
