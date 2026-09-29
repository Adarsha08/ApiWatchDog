"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
const appError_1 = require("../../utils/appError");
exports.userService = {
    create: async (name, email, hashedPassword) => {
        const existing = await prisma_1.default.user.findUnique({ where: { email } });
        if (existing && existing.emailVerified) {
            throw new appError_1.AppError("Email already registered", 409);
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        let user;
        if (existing && !existing.emailVerified) {
            // unverified account already exists — just refresh their OTP and password
            user = await prisma_1.default.user.update({
                where: { email },
                data: { name, password: hashedPassword, otpCode: otp, otpExpiresAt }
            });
        }
        else {
            // brand new email
            user = await prisma_1.default.user.create({
                data: { name, email, password: hashedPassword, otpCode: otp, otpExpiresAt }
            });
        }
        await (0, sendEmail_1.sendEmail)(email, 'Verify your email', `Your verification code is ${otp}`);
        return user;
    },
    verifyOtp: async (email, code) => {
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            throw new appError_1.AppError("User not found", 404);
        if (user.emailVerified)
            throw new appError_1.AppError("Already verified", 400);
        if (user.otpCode !== code)
            throw new appError_1.AppError("Invalid code", 400);
        if (!user.otpExpiresAt || user.otpExpiresAt < new Date())
            throw new appError_1.AppError("Code expired", 400);
        await prisma_1.default.user.update({
            where: { email },
            data: { emailVerified: true, otpCode: null, otpExpiresAt: null }
        });
        return { message: 'Email verified' };
    },
    loginService: async (userId) => {
        const accessToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
        //no creating the access token and refresh token
    }
};
//# sourceMappingURL=userService.js.map