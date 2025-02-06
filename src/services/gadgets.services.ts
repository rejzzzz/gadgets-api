import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

export class GadgetService{

    static async getGadgetById(id: string){
        return await prisma.gadget.findUnique({
            where:{id}
        });
    }

    static async getAllGadgets(){
        return await prisma.gadget.findMany();
    }

    static async addGadget(data: any){
        return await prisma.gadget.create({
            data:{
                name: data.name,
                status: data.status,
            },
        });
    }

    static async updateGadget(id: string, data:{name?: string; status?: Status}){
        return await prisma.gadget.update({
            where:{id},
            data,
        });
    }

    static async decommissionGadget(id: string){
        return await prisma.gadget.update({
            where:{id},
            data:{
                status: "Decommissioned",
                decommissionedAt: new Date(),
            },
        });
    }

    
}