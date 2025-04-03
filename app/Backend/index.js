require('dotenv').config(); // Load environment variables at the top
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000; // Use .env PORT or default to 4000

// Ensure MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db('WeddingDetails');
    collection = db.collection('Details');
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

connectDB(); // Initialize Database Connection

// ✅ API Routes

app.get('/api/contact', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const contactDetails = { name, email, message, createdAt: new Date() };
    const result = await collection.insertOne(contactDetails);
    
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}/api/contact`);
});
