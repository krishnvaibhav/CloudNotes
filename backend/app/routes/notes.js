const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const user = require("../models/User");
const { body, validationResult } = require("express-validator");
// Route 3
// Get all the nodes

router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({
      user: req.user.id,
    });
    res.send(notes);
  } catch (error) {
    res.send({ error });
  }
});

// Router 2 . Add a new route . login required
router.post(
  "/AddNotes",
  fetchUser,
  [
    body("title", "title should be atleast 3 characters").isLength({ min: 3 }),
    body("description", "please enter a descrpition").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ error: errors.array });
    }
    try {
      const { title, description } = req.body;

      const note = new Notes({ title, description, user: req.user.id });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      return res.send({ error });
    }
  }
);

// Route 3 . Update note . login required

router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description } = req.body;
    // create new note obj
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    // Find note to update it
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You are not authorized");
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ updatedNote });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    res.send(deletedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
