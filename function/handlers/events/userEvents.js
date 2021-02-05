const functions = require("../../function");
const errs = require("restify-errors");

module.exports.info = async (req, res, next) => {
  res.json({ userId: req.user._id });
  return next();
};

module.exports.logout = (req, res, next) => {
  let userId = req.user._id;
  res.json({ status: "LOGOUT" });
  functions.deleteTokens(userId);
  return next();
};

module.exports.signin = async (req, res, next) => {
  let params;
  try {
    params = JSON.parse(JSON.stringify(req.body));
  } catch (e) {
    return next(new errs.BadRequestError("could not parse json request body"));
  }

  let check = await functions.checkIfUserExists(params.user);
  console.log(check);
  if (check) {
    check = check.toString();
    if (await functions.checkCredentials(params.user, params.password)) {
      let accessToken = functions.createAccessToken(params.user);
      let refreshToken = functions.createRefreshToken(params.user);
      res.json({
        token_type: "bearer",
        access_token: accessToken.toString(),
        refresh_token: refreshToken.toString(),
      });
      return next();
    }
  }

  return next(new errs.ForbiddenError("Такого пользователя не существует"));
};

module.exports.refresh = async (req, res, next) => {
  let params;
  try {
    params = JSON.parse(JSON.stringify(req.body));
  } catch (e) {
    return next(new errs.BadRequestError("Ошибка"));
  }

  let user = await functions.checkRefreshToken(params.token);
  if (user) {
    console.log(req.body);
    functions.updateRefreshToken(params.token);
    let accessToken = functions.createAccessToken(user);
    res.json({
      token_type: "bearer",
      access_token: accessToken.toString(),
    });
    return next();
  }

  return next(new errs.ForbiddenError("Не авторизован"));
};

module.exports.signup = async (req, res, next) => {
  let params;
  try {
    console.log(req.body);
    params = JSON.parse(JSON.stringify(req.body));
  } catch (e) {
    return next(new errs.BadRequestError("Ошибка"));
  }

  if (!(await functions.checkIfUserExists(params.user))) {
    functions.createUser(params.user, params.password);

    let accessToken = functions.createAccessToken(params.user);
    let refreshToken = functions.createRefreshToken(params.user);
    res.json({
      token_type: "bearer",
      access_token: accessToken.toString(),
      refresh_token: refreshToken.toString(),
    });
    return next();
  } else {
    return next(new errs.ForbiddenError("Пользователь уже есть в базе"));
  }
};
