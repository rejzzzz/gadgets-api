import { Request, Response, RequestHandler } from "express";
import { GadgetService } from "../services/gadgets.services";

export const getGadgets = async (req: Request, res: Response) =>{
    try{
        const gadgets = await GadgetService.getAllGadgets();
        res.json(gadgets);
    }catch(error){
        res.status(500).json({message: "Error Fetching Gadgets"});
        console.log("gadget not found");
    }
};

export const addGadget = async (req:Request, res:Response) => {
    try {
        const gadget = await GadgetService.addGadget(req.body);
        res.status(201).json(gadget);
    } catch (error) {
        res.status(500).json({message:"Error Adding Gadget"});
    }
};

export const updateGadget: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const gadgetAvailable = await GadgetService.getGadgetById(id);
        if (!gadgetAvailable) {
            res.status(404).json({ message: "Gadget Not Found" });
            return;  // Remove return statement from response
        }

        const updatedGadget = await GadgetService.updateGadget(id, { name, status });
        res.json(updatedGadget);
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error! Gadget NOT updated" });
    }
};


export const deleteGadget: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const gadgetAvailable = await GadgetService.getGadgetById(id);
        if (!gadgetAvailable) {
            res.status(404).json({ message: "Gadget Not Found" });
            return; // Ensure function exits after sending response
        }

        const decommissioned = await GadgetService.decommissionGadget(id);
        res.json({ message: "Gadget Decommissioned:", gadget: decommissioned }); // Send response
        return; // Ensure function exits after sending response
    } catch (error) {
        console.error("error while decommissioning :", error);
        res.status(500).json({ message: "Error while decommissioning gadget" }); // Send response
        return; // Ensure function exits after sending response
    }
};