const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());


// ================= HEALTH CHECK =================
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Backend is running"
    });
});


// ================= GET USERS =================
app.get("/api/users", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users"
        );

        res.status(200).json(rows);

    } catch (err) {
        console.error("GET USERS ERROR:", err.message);

        res.status(500).json({
            message: "Database Error"
        });
    }
});


// ================= CREATE USER =================
app.post("/api/users", async (req, res) => {

    const { name, email } = req.body;


    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }


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

        console.error("CREATE USER ERROR:", err.message);

        res.status(500).json({
            message: "Database Error"
        });
    }
});



// ================= MYSQL TEST =================
async function testDatabaseConnection() {

    try {

        const connection = await pool.getConnection();

        console.log("✅ Connected to MySQL");

        connection.release();


    } catch (err) {

        console.error(
            "❌ Database connection failed:",
            err.message
        );

    }
}



// ================= START SERVER =================

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `🚀 Backend running on port ${PORT}`
    );

});


testDatabaseConnection();
