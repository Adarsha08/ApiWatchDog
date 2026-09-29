"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
exports.checkResult = {
    create: async ({ monitorId, statusCode, responseMs }) => {
        return prisma_1.default.checkResult.create({
            data: { monitorId, statusCode, responseMs }
        });
    }
};
//# sourceMappingURL=checkResultService.js.map