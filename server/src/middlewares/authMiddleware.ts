import Jwt  from "jsonwebtoken"
import { Request,Response,NextFunction } from "express"
export const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>
{
     //we have to first get the access token from the frontend 
    const token=req.headers.authorization?.split(' ')[1]
    //here using the split the bearerr and token is splited andsaid to take [1] which is the access token 
    //now we will check if there is any token or not

      if(!token)
    {
        return res.status(401).json({message:'Unauthorized token'})
    }
        if (!process.env.JWT_ACCESS_TOKEN) {
  throw new Error("JWT secret missing");
}
    try{
        const decoded=Jwt.verify(token,process.env.JWT_ACCESS_TOKEN) as {id: string}
        req.user=decoded
        next();
    }
    catch(err:any)
    {
        return res.status(401).json("Invalid token")
    }
}