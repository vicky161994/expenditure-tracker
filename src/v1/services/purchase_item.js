const logger = require("../utils/logger");
const _ = require("loadsh");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const mongoose = require("mongoose");
const { PurchaseItem } = require("../models");
const { PurchaseItemORM } = require("../orm");

exports.createPurchaseItem = async (req, res) => {
  try {
    logger.info("Service::createPurchaseItem");
    if (_.isEmpty(req.body)) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    let {
      purchaseDate,
      purchaseItem,
      units,
      totalCost,
      billAvailable,
      groupId,
    } = req.body;
    if (
      !purchaseDate &&
      !purchaseItem &&
      !units &&
      !totalCost &&
      !billAvailable &&
      !groupId
    ) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    let dataForSave = {};
    let trimmedData = await trimInputData({
      units,
      totalCost,
      purchaseDate,
    });
    dataForSave = new PurchaseItem({
      name: mongoose.Types.ObjectId(purchaseItem),
      groupId: mongoose.Types.ObjectId(groupId),
      createdBy: req.user._id,
      units: trimmedData.units,
      totalCost: trimmedData.totalCost,
      purchased_on: new Date(trimmedData.purchaseDate),
      bill_available: trimmedData.billAvailable,
    });
    await PurchaseItemORM.createPurchaseItem(req, res, dataForSave);
  } catch (error) {
    logger.error(error);
    return res.status(CODE.INTERNAL_SERVER_ERROR).send({
      message: MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

exports.getAllPurchaseItem = async (req, res) => {
  try {
    logger.info("Service::getAllPurchaseItem");
    let sortBy = {};
    const {
      groupId,
      purchaseStartDate,
      purhcaseEndDate,
      item,
      createdBy,
      billAvailable,
    } = req.query;
    if (!groupId) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    let filter = {};
    filter = {
      groupId: mongoose.Types.ObjectId(groupId),
      is_active: true,
      users: { $in: [req.user._id] },
    };
    if (purchaseStartDate) {
      filter.purchased_on = `$gte: ${new Date(purchaseStartDate)}`;
    }
    if (purhcaseEndDate) {
      filter.purchased_on = `$lte: ${new Date(purhcaseEndDate)}`;
    }
    if (item) {
      filter.name = mongoose.Types.ObjectId(item);
    }
    if (createdBy) {
      filter.createdBy = mongoose.Types.ObjectId(createdBy);
    }
    if (billAvailable) {
      filter.bill_available = billAvailable;
    }
    if (!req.params.sortBy) {
      sortBy = { created_on: 1 };
    } else {
      sortBy = { sortBy: 1 };
    }
    await PurchaseItemORM.getAllPurchaseItems(req, res, filter, sortBy);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

exports.getPurchaseItemById = async (req, res) => {
  try {
    let { itemId } = req.params;
    itemId = mongoose.Types.ObjectId(itemId);
    await PurchaseItemORM.getPurchaseItemById(req, res, itemId);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

exports.updatePuchaseItem = async (req, res) => {
  try {
    logger.info("Service::updatePuchaseItem");
    if (_.isEmpty(req.body)) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    let { itemId } = req.params;
    const isPurchaseItemExists = await PurchaseItem.findById(itemId);
    if (!isPurchaseItemExists) {
      return res
        .status(CODE.NOT_FOUND)
        .send({ message: MESSAGE.NO_RECORD_FOUND });
    }
    let updateData = {};
    let { purchaseDate, purchaseItem, units, totalCost, billAvailable } =
      req.body;
    if (purchaseDate) {
      updateData.purchased_on = new Date(purchaseDate);
    }
    if (purchaseItem) {
      updateData.name = mongoose.Types.ObjectId(purchaseItem);
    }
    if (units) {
      updateData.units = units;
    }
    if (totalCost) {
      updateData.totalCost = totalCost;
    }
    if (billAvailable) {
      updateData.bill_available = billAvailable;
    }
    if (purchaseDate) {
      updateData.purchased_on = new Date(purchaseDate);
    }
    await PurchaseItemORM.updatePurchaseItem(req, res, itemId, updateData);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

exports.deletePurchaseItem = async (req, res) => {
  try {
    logger.info("Service::deletePurchaseItem");
    const { itemId } = req.params;
    if (!itemId) {
      return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
    }
    await PurchaseItemORM.deletePurchaseItem(req, res, itemId);
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.INTERNAL_SERVER_ERROR });
  }
};
