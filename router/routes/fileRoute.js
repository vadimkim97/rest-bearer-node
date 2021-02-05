module.exports = (app, passport, Handlers) => {
  app
    .get(
      "/file/list",
      passport.authenticate("bearer", { session: false }),
      Handlers.fileList
    )
    .get(
      "/file/download/:id",
      passport.authenticate("bearer", { session: false }),
      Handlers.fileDownload
    )
    .delete(
      "/file/delete/:id",
      passport.authenticate("bearer", { session: false }),
      Handlers.fileDelete
    )
    .post(
      "/file/upload",
      passport.authenticate("bearer", { session: false }),
      Handlers.fileUpload
    )
    .put(
      "/file/update/:id",
      passport.authenticate("bearer", { session: false }),
      Handlers.fileUpdate
    )
    .get(
      "/file/:id",
      passport.authenticate("bearer", { session: false }),
      Handlers.fileInfo
    );
};
