const {
  userPopulateFields,
  groupPopulateFields,
} = require("./commonConstants");

const userPopulate = {
  path: "createdBy",
  select: userPopulateFields,
};

const groupPopulate = {
  path: "groupId",
  select: groupPopulateFields,
};

module.exports = {
  userPopulate,
  groupPopulate,
};
