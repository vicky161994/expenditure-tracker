const {
  userPopulateFields,
  groupPopulateFields,
  itemPopulateFields,
} = require("./commonConstants");

const userPopulate = {
  path: "createdBy",
  select: userPopulateFields,
};

const groupPopulate = {
  path: "groupId",
  select: groupPopulateFields,
};

const itemPopulate = {
  path: "name",
  select: itemPopulateFields,
};

module.exports = {
  userPopulate,
  groupPopulate,
  itemPopulate,
};
