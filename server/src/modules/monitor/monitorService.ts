import prisma from "../../lib/prisma"
import { AppError } from "../../utils/appError"

type CreateMonitorInput = {
  url: string
  name?: string
  intervalMin?: number
  userId?: string
}

export const monitorService = {
  
    create: async ({ url, name, intervalMin, userId }: CreateMonitorInput) => {
    const existing = await prisma.monitor.findFirst({ where: { url } })
    if (existing) {
      throw new AppError("You're already monitoring this URL", 409)
    }

    return prisma.monitor.create({
      data: { url, name, intervalMin, userId }
    })
  },

  //get the monitors 
  get:async(userId:string)=>
  {
    return prisma.monitor.findMany({
      where:userId?{userId}:{},
      orderBy:{createdAt:"desc"},
      include:{
        checkResults:{
          orderBy:{checkedAt:"desc"},
          take:1
        }
      }
    })
  }
}