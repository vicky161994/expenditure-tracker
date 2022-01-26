const request = require("supertest");
const app = require("../../../main");
const { connectWithRetry } = require("../../../common/config/mongoose.service");
// const { loginTestUser } = require("../../utils/loginTestUser");
const mongoose = require("mongoose");

describe("Testing the auth API", () => {
  const endpoint = "/api/v1/users";
  let userData = {
    fullName: "Test User",
    email: "test@test.com",
    password: "123456",
  };
  let token;
  beforeAll(async () => {
    connectWithRetry();
    // const response = await loginTestUser(app, request);
    // token = response.body.data.token;
  });
  afterAll(async () => {
    // mongoose.connection.close();
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post(`${endpoint}/register`)
      .send(userData);
    console.log("hello test===>>>>", response.status);
    expect(response.status).toEqual(201);
  });
});
