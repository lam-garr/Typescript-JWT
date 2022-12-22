import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import indexRouter from "./routes/indexRoutes";
import apiRouter from "./routes/apiRoutes";
import mongoose from "mongoose";


dotenv.config();

const app: Express = express();

const mongoDB = `${process.env.MONGODB}`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.log.bind(console, "db connection error"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", apiRouter);
app.use("/", indexRouter);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
