const exec = require("child_process").exec;
const errs = require("restify-errors");
const config = require("../config/config.json");

const {
  fileUpload,
  fileUpdate,
  fileInfo,
  fileList,
  fileDelete,
  fileDownload,
} = require("./events/fileEvents");
const {
  info,
  logout,
  signin,
  refresh,
  signup,
} = require("./events/userEvents");

async function latency(req, res, next) {
  exec("ping " + config.pingHost, function (err, stdout) {
    if (err) {
      next(new errs.BadRequestError(err.message));
    } else {
      res.json({ ping: stdout });
      return next();
    }
  });
}

Handlers = function () {
  return {
    info: info,
    logout: logout,
    latency: latency,
    signin: signin,
    refresh: refresh,
    signup: signup,
    fileUpload: fileUpload,
    fileUpdate: fileUpdate,
    fileInfo: fileInfo,
    fileList: fileList,
    fileDelete: fileDelete,
    fileDownload: fileDownload,
  };
};

module.exports = Handlers();
