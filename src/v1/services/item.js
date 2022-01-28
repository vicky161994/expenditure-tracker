const { ItemORM } = require("../orm");
const logger = require("../utils/logger");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const _ = require("loadsh");
const { Item } = require("../models");
const mongoose = require("mongoose");

exports.createItem = async (req, res) => {
  logger.info("Service::createItem");
  try {
    if (_.isEmpty(req.body)) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    let { name, unit, groupId } = req.body;
    groupId = mongoose.Types.ObjectId(groupId);
    if (!name && !unit) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    let trimmedData = await trimInputData({
      name,
      unit,
    });
    trimmedData.groupId = groupId;
    await ItemORM.createItem(req, res, trimmedData);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.getAllItem = async (req, res) => {
  logger.info("Service::getAllItem");
  try {
    let { groupId } = req.query;
    if (!groupId) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    groupId = mongoose.Types.ObjectId(groupId);
    await ItemORM.getAllItems(req, res, groupId);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.getItemById = async (req, res) => {
  logger.info("Service::getItemById");
  try {
    const itemId = req.params.itemId;
    await ItemORM.getItemById(req, res, itemId);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.deleteItem = async (req, res) => {
  logger.info("Service::deleteItem");
  try {
    const itemId = req.params.itemId;
    const isItemExist = await Item.findById(itemId);
    if (!isItemExist) {
      return res
        .status(CODE.UNAUTHORIZED)
        .send({ message: MESSAGE.NO_VALID_RECORD_FOUND });
    }
    await ItemORM.deleteItem(req, res, itemId);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};

exports.updateItem = async (req, res) => {
  logger.info("Service::updateItem");
  try {
    const { itemId } = req.params;
    if (_.isEmpty(req.body)) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    const isItemExist = await Item.findById(itemId);
    if (!isItemExist) {
      return res
        .status(CODE.NOT_FOUND)
        .send({ message: MESSAGE.NO_VALID_RECORD_FOUND });
    }
    const { name, unit } = req.body;
    let updateData = { name, unit };
    await ItemORM.updateItem(req, res, itemId, updateData);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};
