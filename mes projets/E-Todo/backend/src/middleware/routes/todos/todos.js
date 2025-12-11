const express = require("express");
const authenticateToken = require("../auth/token");
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
} = require("./todos.query");

const router = express.Router();

let db;
function init(database) {
  db = database;
}

router.get("/alltodos", authenticateToken, async (req, res) => {
  try {
    const todos = await getAllTodos(db, req.user.userId);
    res.json(todos);
  } catch (err) {
    console.error("Couldn't get tasks:", err);
    res.status(500).send("Error");
  }
});

router.get("/todo/:id", authenticateToken, async (req, res) => {
    try {
        const todos = await getTodo (db, req.params.id, req.user.userId);
        if (!todos) return res.status(404).json({ error: "Task not found" });
        res.json(todos);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({error: "Error fetching task"});
  }
});

router.post("/newtodo", authenticateToken, async (req, res) => {
  try {
    const { title, description, due_time, status } = req.body;
    if (!title || !description || !due_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const id = await createTodo(
      db,
      req.user.userId,
      title,
      description,
      due_time,
      status
    );
    res.status(201).json({ message: "Task created", id });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Error creating task" });
  }
});

router.put("/updatetodo/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;
    const userId = req.user.userId;

    await updateTodo(db, taskId, status, userId);

    res.json({ success: true, taskId, status }); 
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Error updating task" }); 
  }
});

router.delete("/deltodo/:id", authenticateToken, async (req, res) => {
  try {
    await deleteTodo(db, req.params.id, req.user.userId);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Error deleting task");
  }
});

router.delete("/delalltodo", authenticateToken, async(req, res) => {
  try{
    await deleteAllTodo(db, req.user.userId);
    res.json({message : "All Tasks deleted"});
  }catch (err) {
     console.error("Error deleting all tasks:", err);
     res.status(500).send("Error deleting all tasks")
  }
});

module.exports = { router, init };

    

