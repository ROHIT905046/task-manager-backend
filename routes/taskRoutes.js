const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


// CREATE TASK
router.post("/create", async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    const task = new Task({
      title,
      description,
      userId,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});


// GET ALL TASKS
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find().populate("userId", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});


// UPDATE TASK STATUS
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});


// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;