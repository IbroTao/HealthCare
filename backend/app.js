// PACKAGES CONFIGURATION
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUploader from "express-fileupload"

// DATABASE CONFIGURATION
import { dbConnect } from "./database/dbConnect.js";

// ROUTES CONFIGURATION
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRouter.js"

// MIDDLEWARE CONFIGURATION
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

dbConnect();

const app = express();


app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(fileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use("/api/v1/message", messageRouter);
app.use('/api/v1/user', userRouter)

app.use(errorMiddleware);
export default app;