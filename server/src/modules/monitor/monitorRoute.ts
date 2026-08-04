import { Router } from "express";
import {createMontior} from '../monitor/monitorController'
const router=Router()

router.post('/',createMontior)

export default router