const passport = require("passport");
const func = require("../function");
const BearerStrategy = require("passport-http-bearer").Strategy;

passport.use(
  new BearerStrategy(async function (accessToken, done) {
    let userId = await func.checkAccessToken(accessToken);
    if (userId) {
      func.updateAccessToken(accessToken);

      let user = { _id: userId };
      return done(null, user);
    }

    return done(null, false);
  })
);
