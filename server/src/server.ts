import express from 'express'
import monitorRoute from '../src/modules/monitor/monitorRoute'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})

app.listen(5000, () => {
  console.log('Server running on port 5000 lets go ')
})
//api endpoint and route 
app.use('api/monitors',monitorRoute)


// server.ts — must be registered LAST, after all routes
app.use(errorHandler)