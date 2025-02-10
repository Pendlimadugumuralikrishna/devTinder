import express from "express";
import auth from "./middlewares/auth.js";
import connectDb from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import requestRoutes from "./routes/request.route.js";
import cookieParser from "cookie-parser";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRoutes)
app.use("/profile",profileRoutes)
app.use("/request",requestRoutes)

app.listen(PORT,async  ()=>{
    console.log("server is running on port "+PORT);
    await connectDb();
})

export default app;