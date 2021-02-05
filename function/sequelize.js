const config = require("./config/config.json").database,
  Sequelize = require("sequelize"),
  sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    query: {
      raw: true,
    },
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log(err));

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
