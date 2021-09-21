var express = require("express"),
    routes = express.Router();

var interest = require("../api/interest/interestController");

routes.use("/interest", interest);

module.exports = routes;
