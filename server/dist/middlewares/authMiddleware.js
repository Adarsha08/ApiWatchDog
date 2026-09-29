"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../utils/asyncHandler");
const prisma_1 = __importDefault(require("../lib/prisma"));
const authMiddleware = async (req, res, next) => {
    //we have to first get the access token from the frontend 
    const token = req.headers.authorization?.split(' ')[1];
    //here using the split the bearerr and token is splited andsaid to take [1] which is the access token 
    //now we will check if there is any token or not
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token' });
    }
    if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error("JWT secret missing");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json("Invalid token");
    }
};
exports.authMiddleware = authMiddleware;
exports.refreshToken = (0, asyncHandler_1.asynchandler)(async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: 'No refresh token' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        const accessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        res.status(200).json({ accessToken, user: { id: user?.id, name: user?.name, email: user?.email } });
    }
    catch {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
});
//for the logout 
// authController.ts
exports.logout = (0, asyncHandler_1.asynchandler)(async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out' });
});
//# sourceMappingURL=authMiddleware.js.map