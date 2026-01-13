import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const port = 3000;


app.use(cors());           // enable CORS
app.use(express.json());   

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'password_manager';

async function startServer() {
    try {
        await client.connect();
        console.log("MongoDB connected");

        const db = client.db(dbName);
        const collection = db.collection('passwords');

        // GET all passwords
        app.get('/', async (req, res) => {
            const data = await collection.find({}).toArray();
            res.json(data);
        });

        // POST save password
        app.post('/', async (req, res) => {
            const { id, site, username, password } = req.body;

            if (!site || !username || !password) {
                return res.status(400).json({ error: "All fields required" });
            }

            const result = await collection.insertOne({
                id,
                site,
                username,
                password: String(password),
                createdAt: new Date()
            });

            res.status(201).json({
                message: "Password saved",
                insertedId: result.insertedId
            });
        });

        // DELETE password
        app.delete('/:id', async (req, res) => {
            const { id } = req.params;

            try {
                const result = await collection.deleteOne({
                    _id: new ObjectId(id)
                });

                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Password not found" });
                }

                res.json({ message: "Password deleted successfully" });

            } catch {
                res.status(400).json({ error: "Invalid ID" });
            }
        });

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

startServer();
