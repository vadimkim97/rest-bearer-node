const functions = require("../../function");
const errs = require("restify-errors");
const path = require("path");
const fs = require("fs");

module.exports.fileUpload = async (req, res, next) => {
  try {
    if (!req.files) {
      res.json({
        status: false,
        message: "No file uploaded",
      });
      next();
    } else {
      let uploadedFile = req.files.file;

      let uploadTimestamp = Date.now();

      let saveFilePath =
        "./uploads/" + uploadTimestamp + "/" + uploadedFile.name;
      uploadedFile.mv(saveFilePath);

      let ext = path.extname(saveFilePath);

      functions.saveFile2DB(
        uploadedFile.name,
        ext,
        uploadedFile.mimetype,
        uploadedFile.size,
        uploadTimestamp
      );

      res.json({
        status: true,
        message: "File is uploaded",
        data: {
          name: uploadedFile.name,
          extension: ext,
          mimetype: uploadedFile.mimetype,
          size: uploadedFile.size,
          uploadTimestamp: uploadTimestamp,
        },
      });
      next();
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.fileUpdate = async (req, res, next) => {
  try {
    if (!req.files) {
      res.json({
        status: false,
        message: "No file uploaded",
      });
      next();
    } else {
      if (typeof req.params.id === "undefined") {
        return next(new errs.BadRequestError("File not found"));
      }
      let fileId = req.params.id;

      let oldFile = await functions.fileInfo(fileId);

      let oldFilePath = "./uploads/" + oldFile.upload_timestamp;
      fs.rmdir(oldFilePath, { recursive: true }, (err) => {
        console.log(err);
      });

      let uploadedFile = req.files.file;

      let uploadTimestamp = Date.now();

      let saveFilePath =
        "./uploads/" + uploadTimestamp + "/" + uploadedFile.name;
      uploadedFile.mv(saveFilePath);

      let ext = path.extname(saveFilePath);

      functions.updateFileInDB(
        fileId,
        uploadedFile.name,
        ext,
        uploadedFile.mimetype,
        uploadedFile.size,
        uploadTimestamp
      );

      res.json({
        status: true,
        message: "File is updated",
        data: {
          name: uploadedFile.name,
          extension: ext,
          mimetype: uploadedFile.mimetype,
          size: uploadedFile.size,
          uploadTimestamp: uploadTimestamp,
        },
      });
      next();
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.fileInfo = async (req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next(new errs.BadRequestError("File not found"));
  }
  let fileId = req.params.id;

  let file = await functions.fileInfo(fileId);
  if (file) {
    res.json({
      fileName: file.fileName,
      ext: file.ext,
      mime_type: file.mime_type,
      size: file.size,
      upload_timestamp: file.upload_timestamp,
    });
    return next();
  }

  return next(new errs.BadRequestError("Файл не найден"));
};

module.exports.fileList = async (req, res, next) => {
  let params;
  try {
    params = JSON.parse(JSON.stringify(req.body));
  } catch (e) {
    return next(new errs.BadRequestError("Ошибка"));
  }

  let list_size;
  let page;

  if (typeof params.list_size !== "undefined") {
    list_size = params.list_size;
  } else {
    list_size = 10;
  }
  if (typeof params.page !== "undefined") {
    page = params.page;
  } else {
    page = 1;
  }

  let files = await functions.getFilesList(page, list_size);
  res.json({
    files: files,
  });
  return next();
};

module.exports.fileDelete = async (req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next(new errs.BadRequestError("Файл не найден"));
  }
  let fileId = req.params.id;

  let file = await functions.fileInfo(fileId);

  if (file) {
    let filePath = "./uploads/" + file.upload_timestamp;
    fs.rmdir(filePath, { recursive: true }, (err) => {
      console.log(err);
    });

    functions.deleteFileFromDB(fileId);
    res.json({
      status: "deleted",
    });
    return next();
  }

  return next(new errs.BadRequestError("Файл не найден"));
};

module.exports.fileDownload = async (req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next(new errs.BadRequestError("Файл не найден"));
  }
  let fileId = req.params.id;

  let file = await functions.fileInfo(fileId);

  if (file) {
    let filePath = "./uploads/" + file.upload_timestamp + "/" + file.fileName;

    console.log(filePath);

    res.download(filePath, file.fileName, (error) => {
      console.log(error);
    });
    return true;
  }

  return next(new errs.BadRequestError("Файл не найден"));
};
