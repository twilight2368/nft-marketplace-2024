const express = require("express");
const dataRoute = express();
const dataController = require("../controllers/dataController");

dataRoute.get("/allnfts", dataController.nft_get);

dataRoute.get("/nft/:id", dataController.one_nft_get);

dataRoute.get("/user/:id", dataController.user_get);

module.exports = dataRoute;
