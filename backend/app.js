import express from "express";
import {config} from "dotenv"
import cors from "cors"

const app = express();
config({path: "./config/config.env"});

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        process.env.DASHBOARD_URL
    ]
}));

export default app;