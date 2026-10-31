
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    tokenNumber: {
      type: Number,
      required: true,
    },
    tokenCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "serving", "completed", "cancelled"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

tokenSchema.index(
  { serviceName: 1, tokenNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("Token", tokenSchema);
