const express = require("express");

const transRoute = express();
const transactionController = require("../controllers/transactionController");
const requireAuth = require("../middlewares/authRequire");

transRoute.post("/create-payment-intent", requireAuth, transactionController.create_intendent);
transRoute.post("/save-payment", transactionController.handle_success_transaction);
module.exports = transRoute;
