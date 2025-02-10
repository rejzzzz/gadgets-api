import { Request, Response, RequestHandler } from "express";
import { GadgetService } from "../services/gadgets.services";

export const getGadgetsProb = async (req: Request, res: Response) =>{
    try{
        const gadgets = await GadgetService.getAllGadgets();

        const gadgetList = gadgets.map(gadget =>{
            const successProb= Math.floor(Math.random() * 101);
            return `${gadget.name} - ${successProb}% success probabilty`;
        });

        res.json(gadgetList);
    }catch(error){
        res.status(500).json({message: "Error Fetching Gadgets"});
        console.log("gadget not found");
    }
};

const codeNames = ["The Kraken", "The Odin Putra", "The Hathi Mera Sathi", "The Sher Khan", 
    "The Chor Police", "The Floor Wiper", "The Smasher", "The Myth Man", "The Super Star", "The Rebel Kid"];

const randomName = (): string => {
    return codeNames[Math.floor(Math.random() * codeNames.length)];
};

export const addGadget = async (req:Request, res:Response) => {
    try {
        const codeNmae = randomName();

        const gadgetData = {...req.body, codeNmae};

        const gadget = await GadgetService.addGadget(gadgetData);
        res.status(201).json({ 
            id: gadget.id,
            name: gadget.name,
            status: gadget.status,
            createdAt: gadget.createdAt,
            updatedAt: gadget.updatedAt,
            decommissionedAt: gadget.decommissionedAt,
            codename: codeNmae
        });
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
            return;
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
            return; 
        }

        const decommissioned = await GadgetService.decommissionGadget(id);
        res.json({ message: "Gadget Decommissioned:", gadget: decommissioned });
        return;
    } catch (error) {
        console.error("error while decommissioning :", error);
        res.status(500).json({ message: "Error while decommissioning gadget" });
        return;
    }
};

export const getAllGadgetDetails = async(req: Request, res: Response) =>{
    try{
        const gadgets = await GadgetService.getAllGadgets();
        res.json(gadgets);
    }catch(error){
        res.status(500).json({message: "Error Fetching Gadgets"});
        console.log("gadget not found");
    }

};