import prisma  from "../../lib/prisma"

export const checkResult = {
  create: async ({ monitorId, statusCode, responseMs }: { monitorId: string; statusCode: number; responseMs: number }) => {
    return prisma.checkResult.create({
      data: { monitorId, statusCode, responseMs }
    })
  }
}