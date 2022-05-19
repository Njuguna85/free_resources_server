const express = require("express");
const router = express.Router();
const makeExpressCallback = require("../../helpers/express-callback/index");

const route = require("./routes");

const routes = route({ router, makeExpressCallback });

module.exports = routes;
