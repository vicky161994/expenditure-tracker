const logger = require("../utils/logger");
const _ = require("loadsh");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const { UserORM } = require("../orm");
const validator = require("validator");
const { User } = require("../models");
const { trimInputData } = require("../Helper/commonFunction");
const mongoose = require("mongoose");

exports.login = async (req, res) => {
  logger.info("services::login");
  if (_.isEmpty(req.body)) {
    return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
  }
  if (!validator.isEmail(email) && !validator.isMobilePhone(email)) {
    return res.status(CODE.BAD_REQUEST).send({
      message: MESSAGE.INVALID_ARGS,
      type: "email or number",
    });
  }
  const trimmedData = await trimInputData({ email, password });
  await UserORM.login(req, res, trimmedData.email, trimmedData.password);
};

exports.register = async (req, res) => {
  logger.info("services::register");
  try {
    if (_.isEmpty(req.body)) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    let number = null;
    let { fullName, email, password } = req.body;
    if (!validator.isEmail(email) && !validator.isMobilePhone(email)) {
      return res.status(CODE.BAD_REQUEST).send({
        message: MESSAGE.INVALID_ARGS,
        type: "email or number",
      });
    }
    if (validator.isMobilePhone(email)) {
      number = email.trim();
      email = null;
    }
    const isUserExist = await User.findOne({ email: email, number: number });
    if (isUserExist) {
      return res
        .status(CODE.ALREADY_EXIST)
        .send({ message: `User ${MESSAGE.ALREADY_EXIST}` });
    }
    const trimmedData = await trimInputData({
      fullName,
      email,
      password,
      number,
    });
    return await UserORM.register(req, res, trimmedData);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.getUserList = async (req, res) => {
  logger.info("Service::getUserList");
  try {
    let { groupId } = req.query;
    if (!groupId) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    groupId = mongoose.Types.ObjectId(groupId);
    await UserORM.getUserList(req, res, { groupId });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};
