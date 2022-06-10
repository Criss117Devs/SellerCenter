import { Router } from "express";
import { getAll, create } from "../controllers/products.js";

const router = Router();

router.get("/", getAll);
router.post("/create", create);

export default router;
