const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./lib/db');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
const { app, server } = require('./lib/Socket');
const path = require('path');

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

const PORT = process.env.PORT || 5001;
const staticPath = path.resolve();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist"))
    );
}

server.listen(PORT, () => {
    console.log("server is running port :" + PORT);
    connectDB();
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    } else {
        throw err;
    }
});
