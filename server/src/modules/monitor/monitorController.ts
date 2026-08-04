import { NextFunction,Request,response,Response } from "express";
import { asynchandler } from "../../utils/asyncHandler";
import { monitorService } from "./monitorService";
//for creating the monitor for the url 
export const createMontior=asynchandler(async(req:Request,res:Response)=>
{
   const { url, name, intervalMin } = req.body
   if(!url)
   {
    return res.status(400).json({message:"url is required "})
   }
   //run the service 
  const monitor = await monitorService.create({ url, name, intervalMin})
   //get the res back 
   res.status(201).json(monitor)


})
