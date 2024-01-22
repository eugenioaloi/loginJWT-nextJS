import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import validator  from 'validator';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const prisma = new PrismaClient();

export default async  function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        const errors : string [] = [];
        const {email,password} = req.body

        const validationSchema = [
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is invalid"
            },
            {
                valid: !validator.isEmpty(password),
                errorMessage: "Password is invalid"
            }
        ];

        validationSchema.forEach(e =>{
            if(!e.valid){
                errors.push(e.errorMessage);
            }
        })

        if(errors.length>0){
            res.status(400).json({errorMessage : errors[0]});
        }

        const userWithEmail = await prisma.user.findUnique({where:{email}});

        if(!userWithEmail){
            res.status(401).json({errorMessag: "Email is invalid"});
        }else{
            const isMatch = await bcrypt.compare(password, userWithEmail.password)
            if(!isMatch){
                res.status(401).json({errorMessag: "Email or password is invalid"});
            }

            const alg = "HS256"
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
   
            const token = await new jose.SignJWT({email: userWithEmail.email})
            .setProtectedHeader({alg})
            .setExpirationTime("24h")
            .sign(secret)

            return res.status(200).json({
                response:token
            });
        }



    }else{
        res.status(400).json("Unknown endpoint");
    }
}