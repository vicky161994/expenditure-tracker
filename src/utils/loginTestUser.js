exports.loginTestUser = (app, request) => {
  return request(app)
    .post("/api/v1/users/login/")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send({
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    });
};
