import { Router } from "express";
import {
  getAll,
  create,
  find,
  update,
  deleteProduct,
} from "../controllers/products.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", find);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteProduct);

export default router;
