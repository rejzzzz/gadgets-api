import express from "express";
import { getGadgetsProb, addGadget, updateGadget, deleteGadget } from "../controllers/gadgets.controller";

const router = express.Router();

router.get("/", getGadgetsProb);

router.post("/", addGadget);

router.patch("/:id", updateGadget);

router.delete("/:id", deleteGadget);

export { router as gadgetsRoutes };