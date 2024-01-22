import { NextApiRequest, NextApiResponse } from "next";
import * as jose from 'jose'
import jwt from "jsonwebtoken"
import {PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function(req: NextApiRequest, res: NextApiResponse){
    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken.split(" ")[1];

    const payload = jwt.decode(token) as {email:string}

    const user = await prisma.user.findUnique({
        where:{
            email: payload.email
        },
        select:{
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        }
    })
    
    return res.json(user);

}