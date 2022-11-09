require("dotenv").config();

const { development } = require("./knexfile");

const db = require("knex")(development);

module.exports = { db };
