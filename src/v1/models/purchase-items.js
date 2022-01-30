const mongoose = require("mongoose");
const { group, user, purchaseItem, item } = require("../constants/collections");
const purchaseItemSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: item.model,
      default: null,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: group.model,
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
    units: {
      type: String,
      ref: user.model,
      default: null,
    },
    totalCost: {
      type: Number,
      default: null,
    },
    purchased_on: {
      type: Date,
      default: null,
    },
    bill_available: {
      type: Boolean,
      default: true,
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
module.exports = mongoose.model(
  purchaseItem.model,
  purchaseItemSchema,
  purchaseItem.collection
);
