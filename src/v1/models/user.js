const mongoose = require("mongoose");
const { user } = require("../constants/collections");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
      default: null,
    },
    number: {
      type: Number,
      required: true,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    created_on: {
      type: Date,
    },
    modified_on: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "created_on", updatedAt: "modified_on" },
  }
);
module.exports = mongoose.model(user.model, userSchema, user.collection);
