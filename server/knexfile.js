// Update with your config settings.

require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
   development: {
      client: "pg",
      connection: {
         user: process.env.user,
         database: process.env.database,
         port: process.env.db_port,
         host: process.env.host,
      },
   },

   production: {
      client: "pg",
      connection: {
         database: "my_db",
         user: "username",
         password: "password",
      },
      pool: {
         min: 2,
         max: 10,
      },
      migrations: {
         tableName: "knex_migrations",
      },
   },
};
