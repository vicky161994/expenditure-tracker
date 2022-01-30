const request = require("supertest");
const app = require("../../../main");
const { connectWithRetry } = require("../../../common/config/mongoose.service");
const { loginTestUser } = require("../../utils/loginTestUser");
const mongoose = require("mongoose");

describe("Testing the purchase item module API", () => {
  const endpoint = "/api/v1/purchase-item";
  let purchaseItemData = {
    purchaseDate: "2022-01-30",
    purchaseItem: "61f2c8c91e1045cc600f4d92",
    units: "10",
    totalCost: "20000",
    billAvailable: false,
    groupId: "61efc1ed602a0a1f145c16f6",
  };
  let updateData = {
    purchaseDate: "2022-01-30",
    totalCost: "1000",
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

  it("should create a new purchase item", async () => {
    const response = await request(app)
      .post(`${endpoint}`)
      .set("Authorization", `Bearer ${token}`)
      .send(purchaseItemData);
    expect(response.status).toEqual(201);
    console.log("response==>>>", response.body);
    itemId = response.body !== undefined ? response.body.data._id : undefined;
  });

  it("should fetch list of purchase item with status 200", async () => {
    const response = await request(app)
      .get(`${endpoint}?groupId=${purchaseItemData.groupId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("should fetch list of purchase item", async () => {
    const response = await request(app)
      .get(`${endpoint}?groupId=${purchaseItemData.groupId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
  });

  it("should fetch purchase item detail based on id", async () => {
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
