const { GroupORM } = require("../orm");
const logger = require("../utils/logger");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const _ = require("loadsh");
const { Group } = require("../models");
const { setPageAndLimit } = require("../Helper/commonFunction");

exports.createGroup = async (req, res) => {
  logger.info("Service::Group");
  try {
    if (_.isEmpty(req.body)) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    const trimmedData = await trimInputData({
      name,
    });
    await GroupORM.createGroup(req, res, trimmedData);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.getAllGroup = async (req, res) => {
  logger.info("Service::getAllGroup");
  try {
    const { skip, limit } = await setPageAndLimit(req);
    await GroupORM.getAllGroup(req, res, skip, limit);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.getGroupById = async (req, res) => {
  logger.info("Service::getGroupById");
  try {
    const groupId = req.params.groupId;
    await GroupORM.getGroupById(req, res, groupId);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.deleteGroup = async (req, res) => {
  logger.info("Service::deleteGroup");
  try {
    const groupId = req.params.groupId;
    const isGroupExist = await Group.findById(groupId);
    if (!isGroupExist) {
      return res
        .status(CODE.UNAUTHORIZED)
        .send({ message: MESSAGE.NO_VALID_RECORD_FOUND });
    }
    await GroupORM.deleteGroup(req, res, groupId);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};