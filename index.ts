import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "./models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";


dotenv.config();

const app: Express = express();

const mongoDB = `${process.env.MONGODB}`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.log.bind(console, "db connection error"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})

app.post("/signup", async (req:Request, res:Response, next: NextFunction) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        password: hashedPassword
    }).save( err => {
        if(err){
            return next(err);
        }else{
            res.json({message: "succesully signed up"})
        }
    })
})

app.post("/login", async(req:Request, res:Response, next: NextFunction) => {
    const user = await User.findOne({username: req.body.username});

    if(user && (await bcrypt.compare(req.body.password, user.password))){
        const token = jwt.sign({user}, "secret", {expiresIn: "15m"});
        res.json({accessToken:token});
    }else{
        res.status(400).json({message:"Error loggin in"});
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
