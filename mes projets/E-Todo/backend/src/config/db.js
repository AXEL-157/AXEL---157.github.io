const mysql = require("mysql2/promise");

let connection;

async function connectDB() {
  try {
    if (connection) return connection;
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: "3306",
    });

    console.log("✅ Connecté à la base de données MySQL !");

     setInterval(async () => {
      try {
        await connection.query("SELECT 1");
      } catch (err) {
        console.error("MySQL ping failed", err);
      }
    }, 60000); 

    return connection;

  } catch (err) {
    console.error("❌ Erreur de connexion MySQL :", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };