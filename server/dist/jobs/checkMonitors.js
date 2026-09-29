"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMonitorChecks = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const pingUrl_1 = require("../utils/pingUrl");
const checkResultService_1 = require("../modules/checkResult.ts/checkResultService");
const sendEmail_1 = require("../utils/sendEmail");
const startMonitorChecks = () => {
    node_cron_1.default.schedule('*/5 * * * *', async () => {
        const monitors = await prisma_1.default.monitor.findMany({
            include: { user: true }
        });
        for (const monitor of monitors) {
            const result = await (0, pingUrl_1.pingUrl)(monitor.url);
            const previousCheck = await prisma_1.default.checkResult.findFirst({
                where: { monitorId: monitor.id },
                orderBy: { checkedAt: 'desc' }
            });
            const wasUp = !previousCheck || previousCheck.statusCode === 200;
            const isNowDown = result.statusCode !== 200;
            await checkResultService_1.checkResult.create({
                monitorId: monitor.id,
                statusCode: result.statusCode,
                responseMs: result.responseMs
            });
            if (wasUp && isNowDown) {
                await (0, sendEmail_1.sendEmail)(monitor.user.email, `Your monitor is down: ${monitor.name || monitor.url}`, `${monitor.url} did not respond correctly (status ${result.statusCode}) as of ${new Date().toLocaleString()}.`);
                console.log(`ALERT sent for ${monitor.url}`);
            }
            console.log(`Checked ${monitor.url} -> ${result.statusCode} (${result.responseMs}ms)`);
        }
    });
    console.log('Monitor check job started');
};
exports.startMonitorChecks = startMonitorChecks;
//# sourceMappingURL=checkMonitors.js.map