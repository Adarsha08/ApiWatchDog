"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const appError_1 = require("../../utils/appError");
exports.monitorService = {
    create: async ({ url, name, intervalMin, userId }) => {
        const existing = await prisma_1.default.monitor.findFirst({ where: { url, userId } });
        if (existing) {
            throw new appError_1.AppError("You're already monitoring this URL", 409);
        }
        return prisma_1.default.monitor.create({
            data: { url, name, intervalMin, userId }
        });
    },
    getAll: async (userId) => {
        const monitors = await prisma_1.default.monitor.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                checkResults: {
                    orderBy: { checkedAt: "desc" },
                    take: 20
                }
            }
        });
        return monitors.map((monitor) => {
            const checks = monitor.checkResults;
            const latestCheck = checks[0];
            const upCount = checks.filter((c) => c.statusCode >= 200 && c.statusCode < 300).length;
            const uptimePercent = checks.length ? Math.round((upCount / checks.length) * 100) : 0;
            const avgResponseMs = checks.length ? Math.round(checks.reduce((sum, c) => sum + c.responseMs, 0) / checks.length) : 0;
            return { ...monitor, latestCheck, uptimePercent, avgResponseMs };
        });
    },
    getById: async (id, userId) => {
        const monitor = await prisma_1.default.monitor.findFirst({
            where: { id, userId },
            include: {
                checkResults: {
                    orderBy: { checkedAt: "desc" }
                }
            }
        });
        if (!monitor) {
            throw new appError_1.AppError("Monitor not found", 404);
        }
        return monitor;
    },
    deleteById: async (id, userId) => {
        const monitor = await prisma_1.default.monitor.findFirst({ where: { id, userId } });
        if (!monitor)
            throw new appError_1.AppError("Monitor not found", 404);
        await prisma_1.default.checkResult.deleteMany({ where: { monitorId: id } });
        return prisma_1.default.monitor.delete({ where: { id } });
    }
};
//# sourceMappingURL=monitorService.js.map