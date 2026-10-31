const express = require("express");
const mongoose = require("mongoose");
const Queue = require("../models/Queue");
const Token = require("../models/Token");

const router = express.Router();

const servicePrefixes = [
  { pattern: /canteen/i, prefix: "CAN" },
  { pattern: /printout/i, prefix: "PRT" },
  { pattern: /student\s*services/i, prefix: "STD" },
  { pattern: /health\s*center/i, prefix: "HLT" },
];

const getTokenPrefix = (serviceName) => {
  const matchingService = servicePrefixes.find(({ pattern }) =>
    pattern.test(serviceName)
  );

  if (matchingService) {
    return matchingService.prefix;
  }

  const words = serviceName.match(/[a-z0-9]+/gi) || [];
  return (words.length > 1
    ? words.map((word) => word[0]).join("")
    : words[0] || "TOK"
  )
    .slice(0, 3)
    .toUpperCase();
};

router.post("/", async (req, res) => {
  const serviceName =
    typeof req.body?.serviceName === "string"
      ? req.body.serviceName.trim()
      : "";

  if (!serviceName) {
    return res.status(400).json({
      message: "A non-empty serviceName is required",
    });
  }

  let session;

  try {
    session = await mongoose.startSession();
    let createdToken;

    await session.withTransaction(
      async () => {
        const queue = await Queue.findOneAndUpdate(
          { serviceName },
          { $inc: { lastIssuedToken: 1, waitingCount: 1 } },
          {
            new: true,
            runValidators: true,
            session,
            maxTimeMS: 10000,
          }
        );

        if (!queue) {
          const error = new Error(`No queue exists for service "${serviceName}"`);
          error.code = "QUEUE_NOT_FOUND";
          throw error;
        }

        const tokenNumber = queue.lastIssuedToken;
        const tokenCode = `${getTokenPrefix(serviceName)}-${String(
          tokenNumber
        ).padStart(3, "0")}`;
        [createdToken] = await Token.create(
          [
            {
              serviceName,
              tokenNumber,
              tokenCode,
              status: "waiting",
            },
          ],
          { session }
        );
      },
      {
        maxCommitTimeMS: 10000,
      }
    );

    return res.status(201).json(createdToken);
  } catch (error) {
    console.error("Failed to create token:", error);

    if (error.code === "QUEUE_NOT_FOUND") {
      return res.status(404).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "A token with this service name and number already exists",
      });
    }

    if (
      error.code === 20 ||
      error.codeName === "IllegalOperation" ||
      error.message?.includes("Transaction numbers are only allowed")
    ) {
      return res.status(503).json({
        message:
          "Token generation requires a MongoDB deployment that supports transactions",
      });
    }

    return res.status(500).json({
      message: "Unable to create token",
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
});

module.exports = router;
