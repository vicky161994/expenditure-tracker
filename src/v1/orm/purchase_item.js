const logger = require("../utils/logger");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const { PurchaseItem } = require("../models");
const {
  groupPopulate,
  userPopulate,
  itemPopulate,
} = require("../constants/populate");

exports.createPurchaseItem = async (req, res, payload) => {
  try {
    logger.info("ORM::Purchase-Item");
    const savedData = await payload.save();
    return res.status(CODE.NEW_RESOURCE_CREATED).send({
      message: `Purchase item ${MESSAGE.CREATE_SUCCESS}`,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

exports.getAllPurchaseItems = async (req, res, filter = {}, sortBy) => {
  logger.info("ORM::getAllPurchaseItems");
  try {
    const itemList = await PurchaseItem.find(filter)
      .populate(groupPopulate)
      .populate(userPopulate)
      .populate(itemPopulate)
      .lean()
      .sort(sortBy);
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

exports.getPurchaseItemById = async (req, res, itemId) => {
  logger.info("ORM::getPurchaseItemById");
  try {
    const itemData = await PurchaseItem.find({
      _id: itemId,
      is_active: true,
    })
      .populate(groupPopulate)
      .populate(userPopulate)
      .populate(itemPopulate);
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

exports.updatePurchaseItem = async (req, res, itemId, payload) => {
  logger.info("ORM::updatePurchaseItem");
  try {
    await PurchaseItem.findByIdAndUpdate(itemId, payload);
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.UPDATE_SUCCESS,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};

exports.deletePurchaseItem = async (req, res, itemId) => {
  logger.info("ORM::deletePurchaseItem");
  try {
    await PurchaseItem.findByIdAndUpdate(itemId, {
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
