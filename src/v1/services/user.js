const logger = require("../utils/logger");
const _ = require("loadsh");
const CODE = require("../Helper/httpResponseCode");
const MESSAGE = require("../Helper/httpResponseMessage");
const { UserORM } = require("../orm");

exports.login = async (req, res) => {
  logger.info("services::login");
  if (_.isEmpty(req.body)) {
    return res.status(CODE.NOT_FOUND).send({ message: MESSAGE.INVALID_ARGS });
  }
  const { email, password } = req.body;
  await UserORM.login(req, res, email, password);
};
