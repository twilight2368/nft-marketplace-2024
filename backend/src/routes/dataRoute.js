const express = require("express");
const dataRoute = express();
const dataController = require("../controllers/dataController");
const requireAuth = require("../middlewares/authRequire");

dataRoute.get("/allnfts", dataController.nft_get);

dataRoute.get("/nft/:id", dataController.one_nft_get);

dataRoute.get("/account/:id", requireAuth, dataController.user_get);

dataRoute.get("/user/:id", dataController.artist_get);

dataRoute.get(
  "account-data/:id",
  requireAuth,
  dataController.user_dashboard_get
);

dataRoute.get("/coinprice", dataController.price_get);

module.exports = dataRoute;
