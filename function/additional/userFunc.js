const { User } = require("../model/model");

module.exports.createUser = (user, password) => {
  try {
    User.create({
      id: user,
      password: password,
    });
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.checkIfUserExists = async (user) => {
  try {
    let res = await User.findOne({
      where: {
        id: user,
      },
    });
    if (res) {
      return res.id;
    } else {
      return false;
    }
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.checkCredentials = async (user, password) => {
  try {
    let result = await User.findOne({
      attributes: ["id"],
      where: {
        id: user,
        password: password,
      },
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    if (err) throw err;
  }
};
