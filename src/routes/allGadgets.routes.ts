import Express from "express";
import { getAllGadgetDetails } from "../controllers/gadgets.controller";

const router = Express.Router();

router.get("/", getAllGadgetDetails);

export {router as allGadgetRoutes};