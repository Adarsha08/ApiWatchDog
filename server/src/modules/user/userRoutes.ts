import { Router } from "express";
import{addUser,login} from './userController'
const router=Router()
router.post('/',addUser)
router.post('/',login)


export default router