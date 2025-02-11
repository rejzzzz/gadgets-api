import express from "express";
import { getGadgetsProb, addGadget, updateGadget, deleteGadget } from "../controllers/gadgets.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getGadgetsProb);

router.post("/",verifyToken, addGadget);

router.patch("/:id",verifyToken, updateGadget);

router.delete("/:id",verifyToken, deleteGadget);

export { router as gadgetsRoutes };