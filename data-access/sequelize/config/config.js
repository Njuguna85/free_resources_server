require("dotenv").config({ path: __dirname + "/.env" });
// require('dotenv').config({path: `${process.cwd()}/.env`})

const { DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_DIALECT ,DB_TEST_NAME} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: 5432,
    dialect: DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_TEST_NAME,
    host: DB_HOST,
    port: 5432,
    dialect: DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
