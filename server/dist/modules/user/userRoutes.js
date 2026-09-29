"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', userController_1.addUser);
router.post('/login', userController_1.login);
router.post('/refresh', authMiddleware_1.refreshToken);
router.post('/logout', authMiddleware_1.logout);
router.post('/verify-otp', userController_1.verifyOtp);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map