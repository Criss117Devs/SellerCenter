import { Router } from "express";
import { findByOne } from "../controllers/roles.js";


const router = Router();

router.post("/findByOneRol", findByOne);

export default router;