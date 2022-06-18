import { Router } from "express";
import { signIn, signUp } from "../controllers/users.js";

const router = Router();

router.post("/signUp", signUp);
router.post("/signin", signIn);

export default router;
