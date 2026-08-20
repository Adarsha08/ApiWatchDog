import { Request,Response,NextFunction } from "express"
import { asynchandler } from "../../utils/asyncHandler";
import bcrypt from 'bcrypt'
import {userService} from  './userService'

//for creating the user 
export const addUser=asynchandler(async(req:Request,res:Response,next:NextFunction)=>
{
 const {name,email,password}=req.body
 if(!name||!email||!password)
    {
        return res.status(401).json("Fields are empty  ")
    }  
//hashing the password 
const hashPassword=await bcrypt.hash(password,10)
const user=await userService.create(name,email,hashPassword)
res.status(201).json("User Created"

)
    
})