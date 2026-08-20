import express from 'express'
import monitorRoute from '../src/modules/monitor/monitorRoute'
import { errorHandler } from './middlewares/errorHandler'
import { startMonitorChecks } from './jobs/checkMonitors'
import userRoutes from '../src/modules/user/userRoutes'
import cors from 'cors'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})
app.use(cors())

// routes
app.use('/api/monitors', monitorRoute)
app.use('/api/reguster',userRoutes)

// error handler — must stay LAST, after all routes
app.use(errorHandler)

// start background job
startMonitorChecks()

// start server — LAST of all
app.listen(5000, () => {
  console.log('Server running on port 5000 lets go')
})