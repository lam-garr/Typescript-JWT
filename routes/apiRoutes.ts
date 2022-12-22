import express from "express";
import { POST_sign_up, POST_log_in } from "../controllers/apiController";

const router = express.Router();

router.post("/signup", POST_sign_up);

router.post("/login", POST_log_in);

export default router;