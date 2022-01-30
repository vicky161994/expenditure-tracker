const logger = require("../utils/logger");
const { User, Group } = require("../models");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const { serverError, limit } = require("../constants/commonConstants");
const { generateUniqueID } = require("../Helper/commonFunction");
const { userPopulate } = require("../constants/populate");

exports.createGroup = async (req, res, payload) => {
  logger.info("ORM::Group");
  try {
    const groupData = new Group({
      name: payload.name,
      group_id: generateUniqueID(),
      createdBy: req.user._id,
      is_active: true,
    });
    const savedResponse = await groupData.save();
    await itemData.updateOne(
      { _id: savedResponse._id },
      { $addToSet: { users: req.user._id } }
    );
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

exports.getAllGroup = async (req, res, skip, limit) => {
  logger.info("ORM::getAllGroup");
  try {
    const groupList = await Group.find({
      is_active: true,
      users: { $in: [req.user._id] },
    })
      .sort({ created_on: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .populate(userPopulate);
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.SUCCESSFULLY_DONE,
      data: groupList,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};

exports.getGroupById = async (req, res, groupId) => {
  logger.info("ORM::getGroupById");
  try {
    const groupData = await Group.find({
      _id: groupId,
      is_active: true,
    }).populate(userPopulate);
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.SUCCESSFULLY_DONE,
      data: groupData,
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: serverError });
  }
};

exports.deleteGroup = async (req, res, groupId) => {
  logger.info("ORM::deleteGroup");
  try {
    await Group.findByIdAndUpdate(groupId, {
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
