import dotenv from 'dotenv'

dotenv.config()
import express from 'express'
import monitorRoute from '../src/modules/monitor/monitorRoute'
import { errorHandler } from './middlewares/errorHandler'
import { startMonitorChecks } from './jobs/checkMonitors'
import userRoutes from '../src/modules/user/userRoutes'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(cookieParser()) 

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})
app.use(cors(
  {
    origin:process.env.FRONTEND_URL,
    credentials:true
  }
))

// routes
app.use('/api/monitors', monitorRoute)
app.use('/api/auth',userRoutes)

// error handler — must stay LAST, after all routes
app.use(errorHandler)

// start background job
startMonitorChecks()

// start server — LAST of all
app.listen(5000, () => {
  console.log('Server running on port 5000 lets go')
})