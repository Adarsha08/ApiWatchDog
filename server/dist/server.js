"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const monitorRoute_1 = __importDefault(require("./modules/monitor/monitorRoute"));
const errorHandler_1 = require("./middlewares/errorHandler");
const checkMonitors_1 = require("./jobs/checkMonitors");
const userRoutes_1 = __importDefault(require("./modules/user/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// routes
app.use('/api/monitors', monitorRoute_1.default);
app.use('/api/auth', userRoutes_1.default);
// error handler — must stay LAST, after all routes
app.use(errorHandler_1.errorHandler);
// start background job
(0, checkMonitors_1.startMonitorChecks)();
// start server — LAST of all
app.listen(5000, () => {
    console.log('Server running on port 5000 lets go');
});
//# sourceMappingURL=server.js.map