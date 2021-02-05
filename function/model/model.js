const db = require("../sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const User = sequelize.define("user", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: Sequelize.STRING,
});

const RefreshToken = sequelize.define("RefreshToken", {
  userId: Sequelize.STRING,
  token: Sequelize.STRING,
  created: Sequelize.BIGINT,
});

const Files = sequelize.define("Files", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  fileName: Sequelize.STRING,
  ext: Sequelize.STRING,
  mime_type: Sequelize.STRING,
  size: Sequelize.BIGINT,
  upload_timestamp: Sequelize.BIGINT,
});

const AccessToken = sequelize.define("AccessToken", {
  userId: Sequelize.STRING,
  token: Sequelize.STRING,
  created: Sequelize.BIGINT,
});

module.exports = {
  User,
  RefreshToken,
  Files,
  AccessToken,
};
