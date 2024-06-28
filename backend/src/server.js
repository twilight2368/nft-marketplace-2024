const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const minting_route = require("./routes/mintRoute");
const authRoute = require("./routes/authRoute");
const dataRoute = require("./routes/dataRoute");

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

app.use("/images", express.static(path.join(__dirname, "src/assets/uploads")));

app.use(authRoute)
app.use(minting_route)
app.use(dataRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
