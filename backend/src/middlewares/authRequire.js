const express = require("express");
const env = require("dotenv");
const jwt = require("jsonwebtoken");

env.config();

function requireAuth(req, res, next) {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
          console.log("here1");
          res.status(403).json(err);
        } else {
          console.log(decodedToken);
          next();
        }
      });
    } else {
      console.log("here2");
      res.status(403);
      res.json("403 Fobbiden");
    }
  } catch (error) {
    res.json({ error: error });
  }
}

module.exports = requireAuth;
