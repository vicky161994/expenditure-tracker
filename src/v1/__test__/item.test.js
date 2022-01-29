const request = require("supertest");
const app = require("../../../main");
const { connectWithRetry } = require("../../../common/config/mongoose.service");
const { loginTestUser } = require("../../utils/loginTestUser");
const mongoose = require("mongoose");

describe("Testing the item module API", () => {
  const endpoint = "/api/v1/items";
  let groupData = {
    name: "Abc",
    unit: "abc",
    groupId: "61efc1ed602a0a1f145c16f6",
  };
  let updateData = {
    name: "MNO",
    unit: "mno",
  };
  let token,
    itemId,
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

  it("should create a new item", async () => {
    const response = await request(app)
      .post(`${endpoint}`)
      .set("Authorization", `Bearer ${token}`)
      .send(groupData);
    expect(response.status).toEqual(201);
    itemId = response.body !== undefined ? response.body.data._id : undefined;
  });

  it("should fetch list of item with status 200", async () => {
    const response = await request(app)
      .get(`${endpoint}?groupId=${groupData.groupId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("should fetch list of item", async () => {
    const response = await request(app)
      .get(`${endpoint}?groupId=${groupData.groupId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
  });

  it("should fetch item detail based on id", async () => {
    const response = await request(app)
      .get(`${endpoint}/${itemId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data.length).toEqual(1);
  });

  it("should update an item", async () => {
    const response = await request(app)
      .post(`${endpoint}/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);
    expect(response.status).toEqual(200);
  });

  it("delete item based on id", async () => {
    const response = await request(app)
      .delete(`${endpoint}/${itemId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
});
