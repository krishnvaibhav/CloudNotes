const connectMongoDb = require("./db");
const express = require("express");

connectMongoDb();

const app = express();
const port = 5000;

app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
