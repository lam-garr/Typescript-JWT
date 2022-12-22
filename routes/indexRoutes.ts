import express from "express";
import { GET_index } from "../controllers/indexController";

const router = express.Router();

router.get("/", GET_index);

export default router;