import express from "express";
import { signup } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export { router as userRouter };