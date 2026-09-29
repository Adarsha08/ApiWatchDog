"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const monitorController_1 = require("../monitor/monitorController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authMiddleware, monitorController_1.createMontior);
router.get('/', authMiddleware_1.authMiddleware, monitorController_1.getMonitors);
router.get('/:id', authMiddleware_1.authMiddleware, monitorController_1.getMonitorsById);
router.delete('/:id', authMiddleware_1.authMiddleware, monitorController_1.deleteMonitor);
exports.default = router;
//# sourceMappingURL=monitorRoute.js.map