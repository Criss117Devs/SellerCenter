import { Router } from "express";
import {
  getAll,
  create,
  find,
  update,
  deleteProduct,
} from "../controllers/products.js";
import { verifyToken } from "../utils/oAuth.js";

const router = Router();

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, find);
router.post("/create", verifyToken, create);
router.put("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;
