module.exports = (app, passport, Handlers) => {
  app
    .get(
      "/info",
      passport.authenticate("bearer", { session: false }),
      Handlers.info
    )
    .post("/signin", Handlers.signin)
    .post("/signin/new_token", Handlers.refresh)
    .post("/signup", Handlers.signup)
    .get(
      "/logout",
      passport.authenticate("bearer", { session: false }),
      Handlers.logout
    );
};
