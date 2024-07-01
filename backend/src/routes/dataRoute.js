const express = require("express");
const dataRoute = express();
const dataController = require("../controllers/dataController");
const requireAuth = require("../middlewares/authRequire");
const requireOwner = require("../middlewares/ownerRequire");

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

dataRoute.get("/dashboard/:id", requireAuth, dataController.dashboard_data_get);

dataRoute.get(
  "/nft_owner_sale/:userid",
  requireAuth,
  dataController.sale_nft_by_users_get
);

dataRoute.get(
  "/nft_owner_not_sale/:userid",
  requireAuth,
  dataController.nft_not_sale_user_get
);

dataRoute.post(
  "/set_nft_to_not_sale",
  requireAuth,
  requireOwner,
  dataController.set_nft_to_not_sale_post
);

dataRoute.post(
  "/set_nft_to_sale",
  requireAuth,
  requireOwner,
  dataController.set_nft_to_sale_post
);
module.exports = dataRoute;
