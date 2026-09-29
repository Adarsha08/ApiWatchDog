"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const pingUrl = async (url) => {
    const start = Date.now();
    try {
        const res = await axios_1.default.get(url, { timeout: 5000 });
        return { statusCode: res.status, responseMs: Date.now() - start };
    }
    catch (err) {
        return { statusCode: err.response?.status || 0, responseMs: Date.now() - start };
    }
};
exports.pingUrl = pingUrl;
//# sourceMappingURL=pingUrl.js.map