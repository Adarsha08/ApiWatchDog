import { Router } from "express";
import{addUser,login,verifyOtp } from './userController'
import { authMiddleware, refreshToken,logout,} from "../../middlewares/authMiddleware";
const router=Router()
router.post('/register',addUser)
router.post('/login',login)

router.post('/refresh', refreshToken)
router.post('/logout',logout)
router.post('/verify-otp',verifyOtp)


export default router