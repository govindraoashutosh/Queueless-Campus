
const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");

// Get all queues
router.get("/", async (req, res) => {
  try {
    const queues = await Queue.find();
    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new queue
router.post("/", async (req, res) => {
  try {
    console.log("1. Token request received");
console.log("2. Service:", req.body.serviceName);
    const { serviceName, currentToken, waitingCount, estimatedWait } =
      req.body;

    const newQueue = await Queue.create({
      serviceName,
      currentToken,
      waitingCount,
      estimatedWait,
    });

    res.status(201).json(newQueue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 // Update an existing queue
router.put("/:id", async (req, res) => {
  try {
    const updatedQueue = await Queue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedQueue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    res.status(200).json(updatedQueue);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
