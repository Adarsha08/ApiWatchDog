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
  const monitor = await monitorService.create({ url, name, intervalMin,userId: req.user!.id })
   //get the res back 
   res.status(201).json(monitor)


})

//get the monitors 
export const getMonitors=asynchandler(async(req:Request,res:Response)=>
{
   const userId=req.params.id as string
   const monitors=await monitorService.getAll(req.user!.id)
   res.status(200).json(monitors)
})
//get the monitors by id 

export const getMonitorsById=asynchandler(async(req:Request,res:Response)=>
{
   const id=req.params.id as string
   const getMonitorById=await monitorService.getById(id,req.user!.id )
   res.status(200).json(getMonitorById)
})
//delete the monitor 
export const deleteMonitor=asynchandler(async(req:Request,res:Response)=>
{
  const id=req.params.id as string
  const deleteMonitorById=await monitorService.deleteById(id,req.user!.id) 
  res.status(202).json({message:"Deleted the monitor sucessfully "})
})

