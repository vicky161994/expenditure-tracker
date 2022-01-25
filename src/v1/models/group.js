const mongoose = require("mongoose");
const { group, user } = require("../constants/collections");
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: null,
    },
    group_id: {
      type: String,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user.model,
      default: null,
    },
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
module.exports = mongoose.model(group.model, groupSchema, group.collection);
