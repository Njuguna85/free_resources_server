const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use(cors());

// use the json payload for body requests
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ limit: "40mb", extended: true }));

app.get("/", function (req, res) {
  res.send("Free resources Backend");
});

// protect the http headers with helment
app.use(helmet());

// routes
app.use("/api/users", require("./routes/users"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

module.exports = app;
