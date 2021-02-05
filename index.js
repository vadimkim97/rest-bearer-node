const express = require("express"),
  app = express(),
  config = require("./function/config/config.json"),
  Handlers = require("./function/handlers/handler"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  db = require("./function/sequelize"),
  fileUpload = require("express-fileupload"),
  morgan = require("morgan"),
  sequelize = db.sequelize,
  _ = require("lodash");

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(passport.initialize())
  .use(morgan("dev"))
  .use(fileUpload({ createParentPath: true }));

sequelize
  .sync()
  .then(() => console.log("Data base sync success"))
  .catch((err) => console.log(err));

require("./function/libs/auth");
require("./router/router")(app, passport, Handlers);

app.listen(config.port, () => {
  console.log("server up & listening at " + config.port);
});
