import {NextApiRequest, NextApiResponse} from 'next'
import validator  from 'validator';
import {PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import * as jose from 'jose'


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='POST'){
        const {firstName, lastName, email, password, repPassword } = req.body;
        const errors: string[] = [];
        

        const validationSchema = [
            {
                valid: !validator.isEmpty(firstName),
                errorMessage: "First name is empty"
            },
            {
                valid: !validator.isEmpty(lastName),
                errorMessage: "Last name is empty"
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Please insert a valid email"
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Please insert a valid Password. The Password has to be at least 8 characters long and has to contains minimum" + 
                '1 LowerCase character, 1 UpperCase character, 1 number (0-9) and 1 special simbol "@#!|"'
            },
            {
                valid: validator.equals(password,repPassword),
                errorMessage: "The passwords doesn't match"
            },
        ]

        validationSchema.forEach(check =>{
            if(!check.valid){
                errors.push(check.errorMessage)
            }
        })
        
        if(errors.length>0){
            return res.status(400).json({errorMessage: errors[0]})
        }
        
        const userWithEmail = await prisma.user.findUnique({where: {email}});
        
        if(userWithEmail){
            return res.status(400).json({errorMessage: "It seams you alredy have an account whit the given email"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }
        });

        const alg = "HS256"
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const token = await new jose.SignJWT({email: user.email})
            .setProtectedHeader({alg})
            .setExpirationTime("24h")
            .sign(secret)

        res.status(200).json({
            response:token
        });
    }
}