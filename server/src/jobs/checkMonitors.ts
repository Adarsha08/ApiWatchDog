import cron from 'node-cron'
import prisma from '../lib/prisma'
import { pingUrl } from '../utils/pingUrl'
import { checkResult } from '../modules/checkResult.ts/checkResultService'

export const startMonitorChecks = () => {
  cron.schedule('*/5 * * * *', async () => {
    const monitors = await prisma.monitor.findMany()

    for (const monitor of monitors) {
      const result = await pingUrl(monitor.url)
      await checkResult.create({
        monitorId: monitor.id,
        statusCode: result.statusCode,
        responseMs: result.responseMs
      })
      console.log(`Checked ${monitor.url} -> ${result.statusCode} (${result.responseMs}ms)`)
    }
  })
  console.log('Monitor check job started')
}