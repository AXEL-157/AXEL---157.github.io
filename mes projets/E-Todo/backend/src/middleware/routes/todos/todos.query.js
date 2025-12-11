async function getAllTodos(db, userId) {
  const [rows] = await db.query("SELECT * FROM todo WHERE user_id = ?", [userId]);
  return rows;
}

async function getTodo(db, id, userId) {
    const [rows] = await db.query("SELECT * FROM todo WHERE id = ? AND user_id = ?", [id, userId]);
  return rows[0];
}

async function createTodo(db, userId, title, description, due_time, status="not_started"){
  const [result] = await db.query("INSERT INTO todo (user_id, title, description, due_time, status) VALUES (?, ?, ?, ?, ?)", 
    [userId, title, description, due_time, status]
  );
  return result.insertId;
}

async function updateTodo(db, id, status, userId) {
  await db.query("UPDATE todo SET status = ? WHERE id = ? AND user_id = ?", [
    status,
    id,
    userId,
  ]);
}

async function deleteTodo(db, id, userId) {
  await db.query("DELETE FROM todo WHERE id = ? AND user_id = ?", [id, userId]);
}

async function deleteAllTodo(db, userId) {
  await db.query("DELETE FROM todo WHERE user_id= ?", [userId])
}

module.exports = { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo, deleteAllTodo };