import { Request, Response, RequestHandler } from "express";
import { GadgetService } from "../services/gadgets.services";
import { generateConfirmCode } from "../utils/generateCode";

export const SelfDestruct: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const Available = await GadgetService.getGadgetById(id);
        if (!Available) {
            res.status(404).json({ message: "Gadget Not Found" });
            return;
        }

        const Code = generateConfirmCode();

        res.json({ message: "Self-Destructing gadget!", Code, gadget: Available });
        return;

    } catch (error) {
        console.error("error! while self-destructing");
        res.status(500).json({ message: "error while self-destruct" });
        return;
    }
};
