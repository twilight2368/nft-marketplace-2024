const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const minting_route = require("./routes/mintRoute");
const authRoute = require("./routes/authRoute");

env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:3000", // The origin of the front-end
    credentials: true, // Allow cookies
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(authRoute)
app.use(minting_route)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
