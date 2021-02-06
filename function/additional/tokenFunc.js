const crypto = require("crypto");
const { RefreshToken, AccessToken } = require("../model/model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.createAccessToken = (user) => {
  let token = crypto.randomBytes(32).toString("base64");
  let created = Date.now();

  try {
    AccessToken.create({
      userId: user,
      token: token,
      created: created,
    });
    return token;
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.createRefreshToken = (user) => {
  let token = crypto.randomBytes(32).toString("base64");
  let created = Date.now();

  try {
    RefreshToken.create({
      userId: user,
      token: token,
      created: created,
    });
    return token;
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.checkAccessToken = async (token) => {
  try {
    let tokenValidTime = Date.now() - 600000;

    let result = await AccessToken.findOne({
      attributes: ["userId"],
      where: {
        token: token,
        created: {
          [Op.gt]: tokenValidTime,
        },
      },
    });

    if (result) {
      return result.userId;
    } else {
      return false;
    }
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.updateAccessToken = (token) => {
  try {
    let created = Date.now();

    AccessToken.update(
      {
        created: created,
      },
      {
        where: {
          token: token,
        },
      }
    );
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.updateRefreshToken = (token) => {
  try {
    let created = Date.now();

    RefreshToken.update(
      {
        created: created,
      },
      {
        where: {
          token: token,
        },
      }
    );
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.checkRefreshToken = async (token) => {
  try {
    let tokenValidTime = Date.now() - 2592000000;

    let result = await RefreshToken.findOne({
      where: {
        token: token,
        created: {
          [Op.gt]: tokenValidTime,
        },
      },
    });

    if (result.userId) {
      return result.userId;
    } else {
      return false;
    }
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.deleteTokens = (userId) => {
  try {
    AccessToken.destroy({
      where: {
        userId: userId,
      },
    });

    RefreshToken.destroy({
      where: {
        userId: userId,
      },
    });
  } catch (err) {
    if (err) throw err;
  }
};

function deleteExpiredTokens() {
  let now = Date.now();
  let AccessTokenExpirationTime = now - 600000;
  let RefreshTokenExpirationTime = now - 2592000000;
  try {
    AccessToken.destroy({
      where: {
        created: {
          [Op.lt]: AccessTokenExpirationTime,
        },
      },
    });

    RefreshToken.destroy({
      where: {
        created: {
          [Op.lt]: RefreshTokenExpirationTime,
        },
      },
    });
  } catch (err) {
    if (err) throw err;
  }
}

setInterval(function () {
  deleteExpiredTokens();
}, 3600000);
