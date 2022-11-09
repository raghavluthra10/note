const { Pool } = require("pg");
require("dotenv").config();

const connect = async () => {
   try {
      const pool = new Pool({
         user: process.env.user,
         database: process.env.database,
         port: process.env.db_port,
         host: process.env.host,
      });

      await pool.connect();
      console.log("you're connected");
   } catch (error) {
      console.log("something went wrong");
      console.log(error);
   }
};

module.exports = { connect };
