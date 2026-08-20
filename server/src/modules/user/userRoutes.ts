import { Router } from "express";
import{addUser} from './userController'
const router=Router()
router.post('/',addUser)


export default router