import express, { Request, Response, NextFunction } from "express";

export function GET_index(req:Request, res:Response, next: NextFunction){
    res.json({message:"Welcome"})
}