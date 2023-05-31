const connectMongoDb = require("./db");
const express = require("express");

connectMongoDb();

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
