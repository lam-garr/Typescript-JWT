import express, { Request, Response, NextFunction} from "express";
import { POST_sign_up, POST_log_in, GET_user } from "../controllers/apiController";

const router = express.Router();

router.post("/signup", POST_sign_up);

router.post("/login", POST_log_in);

router.get("/user", GET_user);

export default router;