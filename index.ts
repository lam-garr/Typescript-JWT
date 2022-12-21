import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "./models/user";
import bcrypt from "bcrypt";

dotenv.config();

const app: Express = express();

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
        }

        res.json({message: "succesully signed up"})
    })
})

app.post("/login", (req:Request, res:Response, next: NextFunction) => {
    
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
