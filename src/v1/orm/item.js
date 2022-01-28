const logger = require("../utils/logger");
const { Item } = require("../models");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const { serverError } = require("../constants/commonConstants");
const { groupPopulate, userPopulate } = require("../constants/populate");

exports.createItem = async (req, res, payload) => {
  logger.info("ORM::CreateItem");
  try {
    const itemData = new Item({
      name: payload.name,
      groupId: payload.groupId,
      unit: payload.unit,
      createdBy: req.user._id,
      is_active: true,
    });
    const savedResponse = await itemData.save();
    return res.status(CODE.NEW_RESOURCE_CREATED).send({
      message: MESSAGE.CREATE_SUCCESS,
      data: savedResponse,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};

exports.getAllItems = async (req, res, groupId) => {
  logger.info("ORM::getAllItems");
  try {
    const itemList = await Item.find({
      is_active: true,
      groupId: groupId,
      createdBy: req.user._id,
    })
      .populate(groupPopulate)
      .populate(userPopulate)
      .lean()
      .sort({ name: 1 });
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.SUCCESSFULLY_DONE,
      data: itemList,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};

exports.getItemById = async (req, res, itemId) => {
  logger.info("ORM::getItemById");
  try {
    const itemData = await Item.find({
      _id: itemId,
      is_active: true,
    })
      .populate(groupPopulate)
      .populate(userPopulate);
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.SUCCESSFULLY_DONE,
      data: itemData,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};

exports.updateItem = async (req, res, itemId, payload) => {
  logger.info("ORM::updateItem");
  try {
    await Item.findByIdAndUpdate(itemId, payload);
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.SUCCESSFULLY_DONE,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};

exports.deleteItem = async (req, res, itemId) => {
  logger.info("ORM::deleteItem");
  try {
    await Item.findByIdAndUpdate(itemId, {
      is_active: false,
    });
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.DELETE_SUCCESS,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};
