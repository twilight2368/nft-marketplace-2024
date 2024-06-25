const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

env.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const port = process.env.PORT || 8000;

app.use(cors()); //? Enable all CORS requests

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
