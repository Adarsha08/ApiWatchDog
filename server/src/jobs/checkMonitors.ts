import cron from 'node-cron'
import prisma from '../lib/prisma'
import { pingUrl } from '../utils/pingUrl'
import { checkResult } from '../modules/checkResult.ts/checkResultService'
import { sendEmail } from '../utils/sendEmail'

export const startMonitorChecks = () => {
  cron.schedule('*/5 * * * *', async () => {
    const monitors = await prisma.monitor.findMany({
      include: { user: true }
    })

    for (const monitor of monitors) {
      const result = await pingUrl(monitor.url)

      const previousCheck = await prisma.checkResult.findFirst({
        where: { monitorId: monitor.id },
        orderBy: { checkedAt: 'desc' }
      })

      const wasUp = !previousCheck || previousCheck.statusCode === 200
      const isNowDown = result.statusCode !== 200

      await checkResult.create({
        monitorId: monitor.id,
        statusCode: result.statusCode,
        responseMs: result.responseMs
      })

      if (wasUp && isNowDown) {
        await sendEmail(
          monitor.user.email,
          `Your monitor is down: ${monitor.name || monitor.url}`,
          `${monitor.url} did not respond correctly (status ${result.statusCode}) as of ${new Date().toLocaleString()}.`
        )
        console.log(`ALERT sent for ${monitor.url}`)
      }

      console.log(`Checked ${monitor.url} -> ${result.statusCode} (${result.responseMs}ms)`)
    }
  })
  console.log('Monitor check job started')
}