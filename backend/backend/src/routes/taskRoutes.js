const express = require("express");
const router = express.Router();

// ❌ quitamos protect temporalmente
// const protect = require("../middleware/authMiddleware");

let tasks = [];
let id = 1;

// GET - listar tareas (SIN PROTECCIÓN TEMPORAL)
router.get("/", (req, res) => {
  res.json(tasks);
});

// POST - crear tarea (SIN PROTECCIÓN TEMPORAL)
router.post("/", (req, res) => {
  const task = {
    id: id++,
    title: req.body.title,
    userId: 1 // 👈 temporal fijo
  };

  tasks.push(task);
  res.status(201).json(task);
});

// PUT - actualizar tarea (SIN PROTECCIÓN TEMPORAL)
router.put("/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "No encontrada" });
  }

  task.title = req.body.title;
  res.json(task);
});

// DELETE - eliminar tarea (SIN PROTECCIÓN TEMPORAL)
router.delete("/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Eliminada" });
});

module.exports = router;