import express from "express";
import {
  addToCartController,
  removeFromCartController,
} from "../controller/cart.controller.js";
import jwtAuth from "../../../middlewares/jwtAuth.js";
const router = express.Router();
router.route("/").post(addToCartController);
router.route("/:itemId").delete(jwtAuth, removeFromCartController);

export default router;
