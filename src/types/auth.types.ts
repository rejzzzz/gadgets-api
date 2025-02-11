import { Request } from "express";
import { User } from "@prisma/client";

export interface authUser{
    id: string;
    email: string;
}

export interface authReq extends Request{
    user?: Pick<User, "id" | "email">;
}

export interface loginReqBody{
    email: string;
    password: string;
}

export interface registerReqBody extends loginReqBody{
    confirmPassword: string;
}

export interface authResponse{
    token: string;
    user: authUser;
}

export class authError extends Error{

    constructor(message: string, statusCode: number = 401){
        super(message);
        this.name = "AuthError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, authError.prototype);
    }

    public statusCode: number;
}