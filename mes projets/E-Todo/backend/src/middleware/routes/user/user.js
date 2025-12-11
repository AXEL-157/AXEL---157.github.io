const express = require('express');
const router = express.Router();
const userQueries = require('./user.query');
const authenticateToken = require("../auth/token");
const bcrypt = require('bcrypt');


let db;
function init(database) {
  db = database;
}

router.get("/user", authenticateToken, async (req, res) => {
    try {
        const users = await userQueries.getALLUser();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get("/user/todos", authenticateToken, async(req, res) => {
    try {
        const todos = await userQueries.getALLUserTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get("/:id", authenticateToken, async(req, res) => {
    let identifier = req.params.id || req.query.email;
    if (!identifier) {
        return res.status(400).json({ message: "Please provide an email or id" });
    }
    try {
        const user = await userQueries.getUserById(identifier);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const fields = req.body;

    
    if (fields.email) {
      const existingUser = await userQueries.getUserByEmail(fields.email);

      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    
    if (fields.password) {
      const hash = await bcrypt.hash(fields.password, 10);
      fields.password = hash;
    }

    await userQueries.UpdateUser(userId, fields);

    res.json({ message: "User updated" });
  } catch (err) {
    console.error("Update Error :", err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", authenticateToken, async(req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid ID" });

    try {
        const result = await userQueries.deleteUser(userId);

        res.json({ message: 'Account Deleted' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = { router, init };