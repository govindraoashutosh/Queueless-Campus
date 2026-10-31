
const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    currentToken: {
      type: Number,
      default: 0,
    },
    waitingCount: {
      type: Number,
      default: 0,
    },
    lastIssuedToken: {
      type: Number,
      default: 0,
    },
    estimatedWait: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Queue", queueSchema);
