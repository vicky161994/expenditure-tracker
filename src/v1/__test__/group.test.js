const request = require("supertest");
const app = require("../../../main");
const { connectWithRetry } = require("../../../common/config/mongoose.service");
const { loginTestUser } = require("../../utils/loginTestUser");
const mongoose = require("mongoose");

describe("Testing the group module API", () => {
  const endpoint = "/api/v1/groups";
  let groupData = {
    name: "Testing Group",
  };
  let token,
    groupId,
    page = 1,
    limit = 10;
  beforeAll(async () => {
    connectWithRetry();
    const response = await loginTestUser(app, request);
    token = response.body.data.token;
  });
  afterAll(async () => {
    // mongoose.connection.close();
  });

  it("should create a new group", async () => {
    const response = await request(app)
      .post(`${endpoint}`)
      .set("Authorization", `Bearer ${token}`)
      .send(groupData);
    expect(response.status).toEqual(201);
    groupId = response.body !== undefined ? response.body.data._id : undefined;
  });

  it("should fetch list of group with status 200", async () => {
    const response = await request(app)
      .get(`${endpoint}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("should fetch list of group", async () => {
    const response = await request(app)
      .get(`${endpoint}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
  });

  it("should fetch group detail based on id", async () => {
    const response = await request(app)
      .get(`${endpoint}/${groupId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data.length).toEqual(1);
  });

  it("should join a new group", async () => {
    const response = await request(app)
      .post(`${endpoint}/join-group`)
      .set("Authorization", `Bearer ${token}`)
      .send({ groupId });
    expect(response.status).toEqual(200);
  });

  it("delete group based on id", async () => {
    const response = await request(app)
      .delete(`${endpoint}/${groupId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
});
