import { Router } from "express";
import {createMontior,getMonitors,getMonitorsById} from '../monitor/monitorController'
import { authMiddleware } from "../../middlewares/authMiddleware";
const router=Router()

router.post('/',authMiddleware,createMontior)
router.get('/',authMiddleware,getMonitors)
router.get('/:id',authMiddleware,getMonitorsById)

export default router