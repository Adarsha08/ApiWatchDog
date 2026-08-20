import { Router } from "express";
import {createMontior,getMonitors,getMonitorsById} from '../monitor/monitorController'
const router=Router()

router.post('/',createMontior)
router.get('/',getMonitors)
router.get('/:id',getMonitorsById)

export default router