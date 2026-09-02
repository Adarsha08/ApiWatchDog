import { Router } from "express";
import{addUser,login} from './userController'
import { authMiddleware } from "../../middlewares/authMiddleware";
const router=Router()
router.post('/',addUser)
router.post('/',login)


export default router