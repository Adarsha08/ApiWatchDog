import { Request,Response,NextFunction } from "express";

export  const asynchandler=(fn:Function)=>(req:Request,res:Response,next:NextFunction)=>
{
    Promise.resolve(fn(req,res,next)).catch(next)//if the function is reolve then its good do nothing and if it not then run catch 
}
