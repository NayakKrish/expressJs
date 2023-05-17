const express = require("express");
const notesRouter = express.Router();
const auth = require("../middleware/auth");
const {
  allNotes,
  createNotes,
  deleteNotes,
  updateNotes,
} = require("../controller/notesController");

notesRouter.use(express.json());

notesRouter.get("/", auth, allNotes);
notesRouter.post("/create-note", auth, createNotes);
notesRouter.post("/delete-note/:id", auth, deleteNotes);
notesRouter.put("/update-note/:id", auth, updateNotes);

module.exports = notesRouter;
