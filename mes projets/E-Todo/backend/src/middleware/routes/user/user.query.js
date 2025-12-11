const db = require('../../../config/db')

async function getALLUser() {
    const [rows] = await db.query('SELECT id, name, email, firstname, passworld FROM users');
    return rows;
     
}

async function getALLUserTodos() {
    const [rows] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status, created_at FROM todo');
    return rows;

}

async function getUserById(identifier) {
    const connection = await db.connectDB();
    const [rows] = await connection.query(
        'SELECT id, email, password, created_at, name, firstname FROM users WHERE id=? OR email=?', [identifier, identifier]
    );
    return rows[0] || null;
}
async function UpdateUser(userId, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map(key => `${key} = ?`).join(", ");
    const connection = await db.connectDB();
    const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
    const [rows] = await connection.query(sql, [...values, userId]);
    return rows;
}

async function deleteUser(identifier) {
  const connection = await db.connectDB();

  try {
    await connection.query(
      "DELETE FROM todo WHERE user_id = (SELECT id FROM users WHERE id = ?)",
      [identifier]
    );
    const [result] = await connection.query(
      "DELETE FROM users WHERE id = ?",
      [identifier]
    );
    return result;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  } 
}

async function getUserByEmail(email) {
  const connection = await db.connectDB();
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0] || null;
}

module.exports = {
    getUserByEmail,
    getALLUser,
    getALLUserTodos,
    getUserById,
    UpdateUser,
    deleteUser
}