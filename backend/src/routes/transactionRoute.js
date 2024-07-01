const express = require("express");

const transRoute = express();
const transactionController = require("../controllers/transactionController");
const requireAuth = require("../middlewares/authRequire");
const notOwnerRequire = require("../middlewares/notownerRequire");
const balanceRequire = require("../middlewares/balanceRequire");

transRoute.post(
  "/create-payment-intent",
  requireAuth,
  transactionController.create_intendent
);
transRoute.post(
  "/save-payment",
  transactionController.handle_success_transaction
);
transRoute.post(
  "/make_nft_transactions",
  requireAuth,
  notOwnerRequire,
  balanceRequire,
  transactionController.make_transaction_nft_post
);

transRoute.get(
  "/coin_transaction_by_use/:id",
  requireAuth,
  transactionController.coin_transaction_by_user_get
);

transRoute.get(
  "/nfts_transaction_by_use/:id",
  requireAuth,
  transactionController.nfts_transaction_by_user_get
);
module.exports = transRoute;
