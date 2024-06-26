/**
 * todo:
 * * login
 * * register
 * * logout
 */
const express = require("express");
const authRoute = express();
const authController = require("../controllers/authController");

authRoute.post("/signup", authController.signup_post);

authRoute.post("/login", authController.signin_post);

authRoute.get("/logout", authController.logout_get);

module.exports = authRoute;
