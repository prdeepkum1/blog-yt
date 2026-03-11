import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import commentRoute from "./routes/comment.route.js"
import cors from "cors";
import cookieParser from "cookie-parser"
import blogRoute from "./routes/blog.route.js"
// deploy part
import path from "path"


const app = express();
dotenv.config();

// default middlewaref
app.use(express.json()); // For JSON data
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); // For form data
// add frontend to backend
app.use(cors ({
    // http://localhost:5173
    origin:"https://blog-yt-wau1.onrender.com",
    credentials:true,
}));

// deploy part
const _dirname = path.resolve()

const PORT = process.env.PORT || 3000;

app.get("/he", (req, res) => {
    res.send("Hello my yadav family");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// deploy part
app.use(express.static(path.join(_dirname, "frontend/dist")))
// app.get("*", (_, res)=>{
//     res.sendFile(path.resolve(_dirname, "frontend","dist","index.html"))
// })

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running ${PORT}`);
}); 