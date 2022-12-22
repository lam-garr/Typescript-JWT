import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcrypt";

interface userAuthInterface extends Request {
    user: any
}

export async function POST_sign_up(req:Request, res:Response, next: NextFunction){
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
}

export async function POST_log_in(req:Request, res:Response, next: NextFunction){
    const user = await User.findOne({username: req.body.username});

    if(user && (await bcrypt.compare(req.body.password, user.password))){
        const token = jwt.sign({user}, "secret", {expiresIn: "15m"});
        res.json({accessToken:token});
    }else{
        res.status(400).json({message:"Error loggin in"});
    }
}

export function GET_user(req:Request, res:Response, next: NextFunction){
    const authHeader = req.headers["authorization"];

    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, 'secret', (err, user)=>{
            if(err){
                return res.status(403).json({message:err})
            }
            res.json(user);
        })
    }
}