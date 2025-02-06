import express from "express";
import { SelfDestruct } from "../controllers/selfDestruct.controller";

const router = express.Router();

router.post("/:id/self-destruct", SelfDestruct);

export { router as selfDestructRoutes };