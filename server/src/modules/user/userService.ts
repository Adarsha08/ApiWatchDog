import prisma from "../../lib/prisma"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../utils/sendEmail"
import { AppError } from "../../utils/appError"
export const userService=
{
create: async (name: string, email: string, hashedPassword: string) => {
  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing && existing.emailVerified) {
    throw new AppError("Email already registered", 409)
  }

 
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

  let user
  if (existing && !existing.emailVerified) {
    // unverified account already exists — just refresh their OTP and password
    user = await prisma.user.update({
      where: { email },
      data: { name, password: hashedPassword, otpCode: otp, otpExpiresAt }
    })
  } else {
    // brand new email
    user = await prisma.user.create({
      data: { name, email, password: hashedPassword, otpCode: otp, otpExpiresAt }
    })
  }

  await sendEmail(email, 'Verify your email', `Your verification code is ${otp}`)
  return user
},

verifyOtp: async (email: string, code: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new AppError("User not found", 404)

    if (user.emailVerified) throw new AppError("Already verified", 400)
    if (user.otpCode !== code) throw new AppError("Invalid code", 400)
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) throw new AppError("Code expired", 400)

    await prisma.user.update({
      where: { email },
      data: { emailVerified: true, otpCode: null, otpExpiresAt: null }
    })

    return { message: 'Email verified' }
  },

loginService:async(userId:string)=>
{
     const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' })
  return { accessToken, refreshToken }
    //no creating the access token and refresh token

    
}
}