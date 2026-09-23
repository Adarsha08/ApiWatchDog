require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

// transporter.sendMail({
//   from: `"API Watchdog" <${process.env.GMAIL_USER}>`,
//   to: process.env.GMAIL_USER,   // sending to yourself, for the test
//   subject: 'Test email',
//   text: 'If you see this, Nodemailer works.'
// })
//   .then((info) => console.log('Sent:', info.messageId))
//   .catch((err) => console.error('Failed:', err))