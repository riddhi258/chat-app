import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './lib/db';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route';
import messageRoutes from './routes/message.route';
import { app, server } from './lib/Socket';
import path from 'path';

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

    connectDB();
