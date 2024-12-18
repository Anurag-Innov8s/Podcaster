import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser'; 

//routes
import authRoutes from './routes/auth.js';
import podcastsRoutes from './routes/podcast.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

/** Middlewares */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
const port = process.env.PORT || 5000;

let isConnected = false; // Track connection status

const connect = async () => {
    if (isConnected) return; // Use existing connection
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Poddcaster",
            writeConcern: { w: 'majority' },
        });
        isConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};



app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/podcasts", podcastsRoutes)
app.use("/api/user", userRoutes)


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.get("/", (req, res) => {
    res.json({ message: "Hello I am Backend" });
  });

app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
    connect();
})
