const connectMongoDb = require("./db");
const express = require("express");
const cors = require("cors");

connectMongoDb();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`cloudy notes listening on http://localhost:${port}`);
});
