const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Backend is running"
    });
});

// ===== API جديدة =====
app.get("/api/users", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");

        res.status(200).json(rows);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Database Error"
        });
    }
});
//=Post
app.post("/api/users", async (req, res) => {
    const { name, email } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [name, email]
        );

        res.status(201).json({
            message: "User created successfully",
            id: result.insertId
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Database Error"
        });
    }
});
// =====================

async function testDatabaseConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("✅ Connected to MySQL");

        connection.release();
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

testDatabaseConnection();
