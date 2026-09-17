import prisma from "../../lib/prisma"
import jwt from 'jsonwebtoken'
export const userService=
{
create:async(name:string,email:string,hashPassword:string)=>
{
     const checkEmail=await prisma.user.findUnique({where:{email}})
     if(checkEmail)
     {
        throw new Error("Email already registered")
     }
    const user =await prisma.user.create({
        data:{
            name,
            email,
            password:hashPassword
        }
    })
    return user
},
loginService:async(userId:string)=>
{
     const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' })
  return { accessToken, refreshToken }
    //no creating the access token and refresh token

    
}



}