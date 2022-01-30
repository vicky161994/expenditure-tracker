const mongoose = require("mongoose");
const { user, item, group } = require("../constants/collections");
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: group.model,
      default: null,
    },
    unit: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user.model,
      default: null,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: user.model,
        default: [],
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    created_on: {
      type: Date,
      default: new Date(),
    },
    modified_on: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: { createdAt: "created_on", updatedAt: "modified_on" },
  }
);
module.exports = mongoose.model(item.model, itemSchema, item.collection);
