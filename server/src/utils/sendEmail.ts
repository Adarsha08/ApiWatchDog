import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: `"API Watchdog" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text
  })
}