import { Router } from "express";
import {createMontior,getMonitors,getMonitorsById,deleteMonitor} from '../monitor/monitorController'
import { authMiddleware } from "../../middlewares/authMiddleware";
const router=Router()

router.post('/',authMiddleware,createMontior)
router.get('/',authMiddleware,getMonitors)
router.get('/:id',authMiddleware,getMonitorsById)
router.delete('/:id',authMiddleware,deleteMonitor)

export default router