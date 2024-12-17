import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
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
// app.use(morgan('tiny'));
// app.disable('x-powered-by');
// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const port = process.env.PORT || 5000;

const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            dbName: "Poddcaster",
            writeConcern: { w: 'majority' }

        });

        console.log(`Database connected`);
    } catch (error) {
        console.error(error);
    }
};


app.use(express.json())
// app.enable('trust proxy'); // optional, not needed for secure cookies
// app.use(express.session({
//     secret : '123456',
//     key : 'sid',
//     proxy : true, // add this when behind a reverse proxy, if you need secure cookies
//     cookie : {
//         secure : true,
//         maxAge: 5184000000 // 2 months
//     }
// }));

app.use("/api/auth", authRoutes)
app.use("/api/podcasts", podcastsRoutes)
app.use("/api/user", userRoutes)
// app.use("/api/project", projectRoutes)
// app.use("/api/team", teamRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
    connect();
})
