const { Files } = require("../model/model");

module.exports.saveFile2DB = (
  fileName,
  ext,
  mime_type,
  size,
  uploadTimestamp
) => {
  try {
    Files.create({
      fileName: fileName,
      ext: ext,
      mime_type: mime_type,
      size: size,
      upload_timestamp: uploadTimestamp,
    });
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.updateFileInDB = (
  fileId,
  fileName,
  ext,
  mime_type,
  size,
  uploadTimestamp
) => {
  try {
    Files.update(
      {
        fileName: fileName,
        ext: ext,
        mime_type: mime_type,
        size: size,
        uploadTimestamp: uploadTimestamp,
      },
      {
        where: {
          id: fileId,
        },
      }
    );
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.deleteFileFromDB = (id) => {
  try {
    Files.destroy({
      where: {
        id: id,
      },
    });
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.fileInfo = async (id) => {
  try {
    let result = await Files.findOne({
      where: {
        id: id,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (err) {
    if (err) throw err;
  }
};

module.exports.getFilesList = async (page, list_size) => {
  try {
    let result = await Files.findAll(
      {
        attributes: [
          "id",
          "fileName",
          "ext",
          "mime_type",
          "size",
          "upload_timestamp",
        ],
      },
      { offset: parseInt(list_size), limit: (page - 1) * list_size }
    );
    return result;
  } catch (err) {
    if (err) throw err;
  }
};
