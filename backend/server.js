import express from 'express';
import cors from 'cors';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let db; // Global database variable

// Database Initialization
async function initDatabase() {
    db = await open({
        filename: path.join(__dirname, 'database.db'),
        driver: sqlite3.Database
    });

    console.log("SQLite Database Connected Successfully! 🗄️");

    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            name TEXT NOT NULL UNIQUE,
            stock INTEGER NOT NULL
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS technicians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            stock32 INTEGER DEFAULT 0,
            stock43 INTEGER DEFAULT 0,
            stock5565 INTEGER DEFAULT 0
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS installations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            callId TEXT NOT NULL UNIQUE,
            customerName TEXT NOT NULL,
            technicianName TEXT NOT NULL,
            standUsed TEXT NOT NULL,
            date TEXT NOT NULL
        )
    `);

    // Insert Defaults if Empty
    const prodCheck = await db.get("SELECT COUNT(*) as count FROM products");
    if (prodCheck.count === 0) {
        await db.run("INSERT INTO products (category, name, stock) VALUES ('Wall Mount', '32\" Wall Mount', 50)");
        await db.run("INSERT INTO products (category, name, stock) VALUES ('Wall Mount', '43\" Wall Mount', 50)");
        await db.run("INSERT INTO products (category, name, stock) VALUES ('Wall Mount', '55-65\" Wall Mount', 100)");
        await db.run("INSERT INTO products (category, name, stock) VALUES ('Parts', 'Main Board', 20)");
        await db.run("INSERT INTO products (category, name, stock) VALUES ('Parts', 'Power Supply', 15)");
    }

    const techCheck = await db.get("SELECT COUNT(*) as count FROM technicians");
    if (techCheck.count === 0) {
        const defaultTechs = ["Ravi", "Rajeev", "Ravi Baghel", "Hasnain", "Tinku Sagar", "Arun", "Nasir", "Subhash"];
        for (let tech of defaultTechs) {
            await db.run("INSERT INTO technicians (name) VALUES (?)", [tech]);
        }
    }

    console.log("Database Tables Ready! 💎");
}

// ==========================================
// 🔥 REAL API ENDPOINTS / ROUTES START HERE
// ==========================================

// 1. Get All Products & Technicians (Initial Sync)
app.get('/api/initial-data', async (req, res) => {
    try {
        const productsList = await db.all("SELECT * FROM products");
        const techniciansList = await db.all("SELECT * FROM technicians");
        const installationsList = await db.all("SELECT * FROM installations ORDER BY id DESC");
        res.json({ products: productsList, technicians: techniciansList, installations: installationsList });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Add New Product
app.post('/api/products', async (req, res) => {
    const { category, name, stock } = req.body;
    try {
        const result = await db.run(
            "INSERT INTO products (category, name, stock) VALUES (?, ?, ?)",
            [category, name, Number(stock)]
        );
        res.json({ id: result.lastID, category, name, stock: Number(stock) });
    } catch (err) {
        res.status(400).json({ error: "Product already exists or invalid data" });
    }
});

// 3. Edit Product
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { category, name, stock } = req.body;
    try {
        await db.run(
            "UPDATE products SET category = ?, name = ?, stock = ? WHERE id = ?",
            [category, name, Number(stock), id]
        );
        res.json({ success: true, message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Delete Product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.run("DELETE FROM products WHERE id = ?", [id]);
        res.json({ success: true, message: "Product deleted from DB" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Issue Stock Endpoint
app.post('/api/issue-stock', async (req, res) => {
    const { techId, prodId, qty } = req.body;
    const quantity = Number(qty);

    try {
        const product = await db.get("SELECT * FROM products WHERE id = ?", [prodId]);
        if (!product || product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock in company warehouse" });
        }

        // Deduct from company warehouse
        await db.run("UPDATE products SET stock = stock - ? WHERE id = ?", [quantity, prodId]);

        // Identify tech column based on product name
        let col = "stock5565";
        if (product.name.toLowerCase().includes("32")) col = "stock32";
        else if (product.name.toLowerCase().includes("43")) col = "stock43";

        // Plus into technician hand-stock
        await db.run(`UPDATE technicians SET ${col} = ${col} + ? WHERE id = ?`, [quantity, techId]);

        res.json({ success: true, message: "Stock issued successfully in DB" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Return Stock Endpoint
app.post('/api/return-stock', async (req, res) => {
    const { techId, prodId, qty } = req.body;
    const quantity = Number(qty);

    try {
        const product = await db.get("SELECT * FROM products WHERE id = ?", [prodId]);
        if (!product) return res.status(404).json({ error: "Product not found" });

        let col = "stock5565";
        if (product.name.toLowerCase().includes("32")) col = "stock32";
        else if (product.name.toLowerCase().includes("43")) col = "stock43";

        const tech = await db.get("SELECT * FROM technicians WHERE id = ?", [techId]);
        if (!tech || tech[col] < quantity) {
            return res.status(400).json({ error: "Technician doesn't have enough hand stock to return" });
        }

        // Minus from tech, plus into company stock
        await db.run(`UPDATE technicians SET ${col} = ${col} - ? WHERE id = ?`, [quantity, techId]);
        await db.run("UPDATE products SET stock = stock + ? WHERE id = ?", [quantity, prodId]);

        res.json({ success: true, message: "Stock returned successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Installation Submission Endpoint
app.post('/api/installations', async (req, res) => {
    const { techId, callId, customerName, standSize } = req.body;

    try {
        const tech = await db.get("SELECT * FROM technicians WHERE id = ?", [techId]);
        if (!tech) return res.status(404).json({ error: "Technician not found" });

        let col = standSize === "32" ? "stock32" : standSize === "43" ? "stock43" : "stock5565";
        if (tech[col] < 1) {
            return res.status(400).json({ error: "Technician does not have this stand in hand stock!" });
        }

        // Deduct 1 from tech hand-stock
        await db.run(`UPDATE technicians SET ${col} = ${col} - 1 WHERE id = ?`, [techId]);

        // Insert installation record
        const dateStr = new Date().toLocaleString();
        await db.run(
            "INSERT INTO installations (callId, customerName, technicianName, standUsed, date) VALUES (?, ?, ?, ?, ?)",
            [callId.toUpperCase(), customerName, tech.name, `${standSize}" Wall Mount`, dateStr]
        );

        res.json({ success: true, message: "Installation logged & stock deducted!" });
    } catch (err) {
        res.status(400).json({ error: "Call ID already logged or invalid data" });
    }
});

// Start Server
app.listen(PORT, async () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
    await initDatabase();
});