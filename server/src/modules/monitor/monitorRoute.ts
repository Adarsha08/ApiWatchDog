import { Router } from "express";
import {createMontior,getMonitors} from '../monitor/monitorController'
const router=Router()

router.post('/',createMontior)
router.get('/',getMonitors)

export default router