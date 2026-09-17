import { Router } from "express";
import{addUser,login} from './userController'
import { authMiddleware, refreshToken,logout } from "../../middlewares/authMiddleware";
const router=Router()
router.post('/register',addUser)
router.post('/login',login)

router.post('/refresh', refreshToken)
router.post('/logout',logout)


export default router