const logger = require("../utils/logger");
const { User } = require("../models");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const bcrypt = require("bcrypt");
const { serverError } = require("../constants/commonConstants");
const generateToken = require("../Helper/commonFunction");

exports.login = async (req, res, email, password) => {
  logger.info("ORM::login");
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res
        .status(CODE.NOT_FOUND)
        .send({ message: MESSAGE.NO_VALID_RECORD_FOUND });
    }
    const match = await bcrypt.compare(password, isUserExist.password);
    if (!match) {
      return res
        .status(CODE.UNAUTHORIZED)
        .send({ message: MESSAGE.NO_VALID_RECORD_FOUND });
    }
    const token = await generateToken(isUserExist);
    return res.status(CODE.EVERYTHING_IS_OK).send({
      message: MESSAGE.SUCCESSFULLY_DONE,
      data: { ...isUserExist, token },
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(CODE.INTERNAL_SERVER_ERROR)
      .send({ message: MESSAGE.serverError });
  }
};
