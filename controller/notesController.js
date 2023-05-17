const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const allNotes = async (req, res) => {
  res.json(await prisma.notes.findMany());
};

const createNotes = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (title && description) {
      const result = await prisma.notes.create({
        data: {
          title: title,
          description: description,
        },
      });
      res.status(201).json({
        message: "Created Successfully",
        note: result,
      });
    } else {
      res.status(403).json({
        message: "Forbidden!!",
      });
    }
  } catch (error) {
    res.status(500).send("Something went wrong! ");
  }
};

const deleteNotes = async (req, res) => {
  const noteId = req.params.id;
  try {
    if (noteId) {
      const existingNote = await prisma.notes.findUnique({
        where: {
          id: Number(noteId),
        },
      });
      if (existingNote) {
        await prisma.notes.delete({
          where: {
            id: Number(noteId),
          },
        });
        res.status(202).json({
          message: "Deleted Successfully!",
        });
      } else {
        return res.status(404).send("Note not found!");
      }
    } else {
      return res.status(403).json({
        message: "Forbidden!!",
      });
    }
  } catch (error) {
    res.status(500).send("Something went wrong! ");
  }
};

const updateNotes = async (req, res) => {
  const noteId = req.params.id;
  const { title, description } = req.body;
  const updatedNote = {
    title: title,
    description: description,
  };
  try {
    if (title && description) {
      const result = await prisma.notes.update({
        where: { id: Number(noteId) },
        data: updatedNote,
      });
      res.status(200).json({
        message: "Updated Successfully",
        note: result,
      });
    } else {
      res.status(403).json({
        message: "Forbidden!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong! ");
  }
};

module.exports = { allNotes, createNotes, deleteNotes, updateNotes };
