import Jwt  from "jsonwebtoken"
import { Request,Response,NextFunction } from "express"
import { asynchandler } from "../utils/asyncHandler"
export const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>
{
     //we have to first get the access token from the frontend 
    const token=req.headers.authorization?.split(' ')[1]
    //here using the split the bearerr and token is splited andsaid to take [1] which is the access token 
    //now we will check if there is any token or not

      if(!token)
    {
        return res.status(401).json({message:'Unauthorized token'})
    }
        if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT secret missing");
}
    try{
        const decoded=Jwt.verify(token,process.env.JWT_ACCESS_SECRET) as {id: string}
        req.user=decoded
        next();
    }
    catch(err:any)
    {
        return res.status(401).json("Invalid token")
    }
}
export const refreshToken = asynchandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken

  if (!token) {
    return res.status(401).json({ message: 'No refresh token' })
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { id: string }

    const accessToken = Jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: '15m' }
    )

    res.status(200).json({ accessToken })
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }
})

//for the logout 
// authController.ts
export const logout = asynchandler(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  })
  res.status(200).json({ message: 'Logged out' })
})