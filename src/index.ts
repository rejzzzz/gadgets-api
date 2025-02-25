import express from "express";
import dotenv from "dotenv";
import { selfDestructRoutes } from "./routes/selfDestruct.routes";
import { gadgetsRoutes } from "./routes/gadgets.routes";
import {allGadgetRoutes} from "./routes/allGadgets.routes";
import { authRoutes } from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authRoutes)
app.use("/gadgets", gadgetsRoutes)
app.use("/gadgets", selfDestructRoutes);
app.use("/all", allGadgetRoutes);

app.get("/", (req, res) => {
    res.send("api is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`server running on port:${PORT}`);
});