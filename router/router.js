module.exports = (app, passport, Handlers) => {
  require("./routes/userRoute")(app, passport, Handlers);
  require("./routes/fileRoute")(app, passport, Handlers);

  app.get(
    "/latency",
    passport.authenticate("bearer", { session: false }),
    Handlers.latency
  );
};
