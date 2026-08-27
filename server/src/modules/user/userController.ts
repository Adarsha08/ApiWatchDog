import { Request,Response,NextFunction } from "express"
import { asynchandler } from "../../utils/asyncHandler";
import bcrypt from 'bcrypt'
import {userService} from  './userService'
import prisma from "../../lib/prisma";

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
//for login 
export const login = asynchandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const { accessToken, refreshToken } = await userService.loginService(user.id)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  return res.status(200).json({
    message: 'Login successful',
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  })
})