"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMonitor = exports.getMonitorsById = exports.getMonitors = exports.createMontior = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const monitorService_1 = require("./monitorService");
//for creating the monitor for the url 
exports.createMontior = (0, asyncHandler_1.asynchandler)(async (req, res) => {
    const { url, name, intervalMin } = req.body;
    if (!url) {
        return res.status(400).json({ message: "url is required " });
    }
    //run the service 
    const monitor = await monitorService_1.monitorService.create({ url, name, intervalMin, userId: req.user.id });
    //get the res back 
    res.status(201).json(monitor);
});
//get the monitors 
exports.getMonitors = (0, asyncHandler_1.asynchandler)(async (req, res) => {
    const userId = req.params.id;
    const monitors = await monitorService_1.monitorService.getAll(req.user.id);
    res.status(200).json(monitors);
});
//get the monitors by id 
exports.getMonitorsById = (0, asyncHandler_1.asynchandler)(async (req, res) => {
    const id = req.params.id;
    const getMonitorById = await monitorService_1.monitorService.getById(id, req.user.id);
    res.status(200).json(getMonitorById);
});
//delete the monitor 
exports.deleteMonitor = (0, asyncHandler_1.asynchandler)(async (req, res) => {
    const id = req.params.id;
    const deleteMonitorById = await monitorService_1.monitorService.deleteById(id, req.user.id);
    res.status(202).json({ message: "Deleted the monitor sucessfully " });
});
//# sourceMappingURL=monitorController.js.map