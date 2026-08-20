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
 getAll: async (userId?: string) => {
  const monitors = await prisma.monitor.findMany({
    where: userId ? { userId } : {},
    orderBy: { createdAt: "desc" },
    include: {
      checkResults: {
        orderBy: { checkedAt: "desc" }
      }
    }
  })

  // calculate uptime % and avg response time for each monitor
  return monitors.map((monitor) => {
    const checks = monitor.checkResults
    const total = checks.length
    const upCount = checks.filter((c) => c.statusCode === 200).length
    const uptimePercent = total > 0 ? (upCount / total) * 100 : 100
    const avgResponseMs = total > 0
      ? Math.round(checks.reduce((sum, c) => sum + c.responseMs, 0) / total)
      : 0
    const latestCheck = checks[0]

    return {
      ...monitor,
      uptimePercent: Number(uptimePercent.toFixed(2)),
      avgResponseMs,
      latestCheck
    }
  })
},
//get teh monitor details by id 
getById:async(id:string)=>
{
  const monitor=await prisma.monitor.findUnique({
    where:{id},
    include:{
      checkResults:{
        orderBy:{checkedAt:"desc"}
      }
    }
  })

    if (!monitor) {
    throw new AppError("Monitor not found", 404)
  }
  return monitor
}
}