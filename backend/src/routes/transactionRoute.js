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
  "make_nft_transactions",
  requireAuth,
  notOwnerRequire,
  balanceRequire,
  transactionController.make_transaction_nft_post
);
module.exports = transRoute;
