import app from "./app.js"
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT

app.listen(process.env.PORT, ()=> {
    console.log(`App is running on PORT ${port}`);
})