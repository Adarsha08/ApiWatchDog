"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// src/utils/AppError.ts
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map