"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.login = exports.addUser = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("./userService");
const prisma_1 = __importDefault(require("../../lib/prisma"));
//for creating the user 
exports.addUser = (0, asyncHandler_1.asynchandler)(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(401).json("Fields are empty  ");
    }
    //hashing the password 
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    const user = await userService_1.userService.create(name, email, hashPassword);
    res.status(201).json("User Created");
});
//for login 
exports.login = (0, asyncHandler_1.asynchandler)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const { accessToken, refreshToken } = await userService_1.userService.loginService(user.id);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        message: 'Login successful',
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    });
});
exports.verifyOtp = (0, asyncHandler_1.asynchandler)(async (req, res) => {
    const { email, code } = req.body;
    const result = await userService_1.userService.verifyOtp(email, code);
    res.status(200).json(result);
});
//# sourceMappingURL=userController.js.map