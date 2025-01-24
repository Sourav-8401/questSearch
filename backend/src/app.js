import express from "express";
import cors from "cors";
const app  = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


// routes import
import searchRouter from "./routes/search.routes.js"
app.use("/search",searchRouter);
export {app}
