import prisma from "../../lib/prisma"
import { AppError } from "../../utils/appError"

type CreateMonitorInput = {
  url: string
  name?: string
  intervalMin?: number
  userId: string
}

export const monitorService = {
  create: async ({ url, name, intervalMin, userId }: CreateMonitorInput) => {
    const existing = await prisma.monitor.findFirst({ where: { url, userId } })
    if (existing) {
      throw new AppError("You're already monitoring this URL", 409)
    }
    return prisma.monitor.create({
      data: { url, name, intervalMin, userId }
    })
  },

  getAll: async (userId: string) => {
    const monitors = await prisma.monitor.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        checkResults: {
          orderBy: { checkedAt: "desc" },
          take: 20
        }
      }
    })

    return monitors.map((monitor) => {
      const checks = monitor.checkResults
      const latestCheck = checks[0]
      const upCount = checks.filter((c) => c.statusCode >= 200 && c.statusCode < 300).length
      const uptimePercent = checks.length ? Math.round((upCount / checks.length) * 100) : 0
      const avgResponseMs = checks.length ? Math.round(checks.reduce((sum, c) => sum + c.responseMs, 0) / checks.length) : 0

      return { ...monitor, latestCheck, uptimePercent, avgResponseMs }
    })
  },

  getById: async (id: string, userId: string) => {
  const monitor = await prisma.monitor.findFirst({
    where: { id, userId },
    include: {
      checkResults: {
        orderBy: { checkedAt: "desc" }
      }
    }
  })
  if (!monitor) {
    throw new AppError("Monitor not found", 404)
  }
  return monitor
} ,
deleteById:async(id:string,userId:string)=>
{
  const monitor = await prisma.monitor.findFirst({ where: { id, userId } })
  if (!monitor) throw new AppError("Monitor not found", 404)

  await prisma.checkResult.deleteMany({ where: { monitorId: id } })
  return prisma.monitor.delete({ where: { id } })
}
}